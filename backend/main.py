from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from typing import Optional
from datetime import datetime, date
import os
from dotenv import load_dotenv
from services.ai.openrouter import call_openrouter

# 1. Load Environment Variables
load_dotenv()
MONGO_URI = os.getenv("MONGO_URI")

app = FastAPI()

# 2. CORS Setup
origins = ["http://localhost:5173", "http://localhost:3000"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 3. Database Connection
client = AsyncIOMotorClient(MONGO_URI)
db = client.resolution_db
resolutions_collection = db.resolutions
stats_collection = db.stats

# --- DATA MODELS ---

class Resolution(BaseModel):
    title: str
    description: Optional[str] = None
    points: int = 10
    
    # New Required Field: 'daily' or 'onetime'
    type: str 
    
    # Optional deadline for one-time tasks
    target_date: Optional[str] = None 
    
    # Internal Defaults
    status: str = "active" # "active", "completed", "archived"
    last_completed_at: Optional[str] = None 
    created_at: str = Field(default_factory=lambda: datetime.now().isoformat())

class AIPrompt(BaseModel):
    prompt: str

def resolution_helper(resolution) -> dict:
    # Logic to determine if the task is "done for today"
    is_completed_today = False
    
    if resolution["type"] == "daily":
        today_str = date.today().isoformat()
        # Check if the last completion date matches today
        if resolution.get("last_completed_at") and resolution["last_completed_at"].startswith(today_str):
            is_completed_today = True
            
    elif resolution["type"] == "onetime":
        # One-time tasks are done if their status is explicitly 'completed'
        is_completed_today = (resolution["status"] == "completed")

    return {
        "id": str(resolution["_id"]),
        "title": resolution["title"],
        "description": resolution.get("description", ""),
        "points": resolution["points"],
        "type": resolution["type"],
        "target_date": resolution.get("target_date"),
        "status": resolution["status"],
        "completed_today": is_completed_today, # Computed for frontend UI
    }

# --- ROUTES ---

@app.get("/api")
async def check_connection():
    return {"status": "ok", "message": "Backend is running!"}

@app.get("/api/score")
async def get_score():
    stats = await stats_collection.find_one({"_id": "global_stats"})
    if not stats:
        await stats_collection.insert_one({"_id": "global_stats", "total_points": 0})
        return {"total_points": 0}
    return {"total_points": stats["total_points"]}

@app.get("/api/resolutions")
async def get_resolutions():
    resolutions = []
    # Fetch only active tasks (hide archived ones)
    async for resolution in resolutions_collection.find({"status": {"$ne": "archived"}}):
        resolutions.append(resolution_helper(resolution))
    return resolutions

@app.post("/api/resolutions")
async def add_resolution(resolution: Resolution):
    # Insert new task into MongoDB
    new_res = await resolutions_collection.insert_one(resolution.dict())
    created_res = await resolutions_collection.find_one({"_id": new_res.inserted_id})
    return resolution_helper(created_res)

@app.put("/api/resolutions/{id}/complete")
async def complete_resolution(id: str):
    task = await resolutions_collection.find_one({"_id": ObjectId(id)})
    if not task:
        raise HTTPException(status_code=404, detail="Resolution not found")

    today_str = datetime.now().isoformat()
    update_data = {}
    
    # LOGIC: Handle Daily vs One-Time
    if task["type"] == "daily":
        # Daily: Update timestamp so it shows as done for today, but keep status 'active'
        update_data = {"last_completed_at": today_str}
    
    elif task["type"] == "onetime":
        # One-time: Mark as permanently completed
        update_data = {
            "last_completed_at": today_str,
            "status": "completed"
        }

    # Update the task
    await resolutions_collection.update_one(
        {"_id": ObjectId(id)},
        {"$set": update_data}
    )

    # Add Points to Global Score
    points_to_add = task.get("points", 10)
    await stats_collection.update_one(
        {"_id": "global_stats"},
        {"$inc": {"total_points": points_to_add}}, 
        upsert=True
    )
    
    return {"message": "Task completed!", "points_added": points_to_add}

# --- AI ROUTES ---

@app.post("/api/testai")
async def test_ai(request: AIPrompt):
    """Test endpoint for OpenRouter AI integration"""
    if not request.prompt or not request.prompt.strip():
        raise HTTPException(status_code=400, detail="Prompt cannot be empty")
    
    try:
        response = await call_openrouter(request.prompt)
        return {"response": response}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        print(f"AI Route Error: {e}")
        raise HTTPException(status_code=500, detail=f"Error calling AI service: {str(e)}")