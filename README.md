# 🏋️ PeerPressure

**"Gamified self-improvement powered by AI... and anxiety."**

**[Click Here to Visit App...before our credits run out :(](https://peer-pressure-67.vercel.app)**

PeerPressure turns your New Year's resolutions and daily habits into a competitive sport. We leverage social pressure to keep you consistent—because nothing motivates quite like the fear of falling behind your friends on the leaderboard.

---

## ✨ Features

* **🤖 AI Task Agent:** Don't know how to start? Just type a sentence like *"I want to get fit"* or *"Learn Python,"* and our AI (powered by OpenRouter) instantly converts it into structured, trackable tasks with difficulty-based point values.
* **🏆 Global Leaderboard:** Compete against every other user on the platform. Your "Total Score" is visible to the world—so keep your streak alive to stay on top.
* **📊 Gamified Tracking:** Earn points and XP for every completed task.
* **🔐 User Accounts:** Secure Sign Up & Login to save your progress and score across devices.

---

## 🛠️ Tech Stack & Architecture

PeerPressure is a full-stack application deployed to the cloud.

* **Frontend:** React + Vite + Tailwind CSS (Hosted on **Vercel**)
* **Backend:** Python FastAPI (Hosted on **Render**)
* **AI:** OpenRouter API (LLM Integration)
* **Database:** MongoDB Atlas (Cloud)
* **Authentication:** JWT (JSON Web Tokens) with Bcrypt hashing

---

**Made with ❤️ and ☕ during DeltaHacks 12**

```mermaid 
  graph TD
    %% --- Definitions of Nodes ---
    subgraph Client ["💻 Client Side (Browser)"]
        User[👤 User]
        UI["⚛️ Frontend SPA (React + Vite + Tailwind)"]
    end

    subgraph VercelCloud ["☁️ Vercel Hosting"]
        UI
    end

    subgraph RenderCloud ["☁️ Render Hosting"]
        Backend["🐍 Backend API Server (FastAPI + Uvicorn)"]
        
        subgraph Backend Internals
            Auth["🔐 Auth Handler (JWT/Bcrypt)"]
            GameLogic["🎮 Gamification Logic & Points"]
        end
        Backend --- Auth
        Backend --- GameLogic
    end

    subgraph Data Layer
        DB[("🍃 MongoDB Atlas (Database)")]
    end

    subgraph AI Layer
        AI["🤖 OpenRouter API (LLM Provider)"]
    end

    %% --- Connections and Data Flow ---
    
    %% 1. User loads app
    User ==>|"1. Visits URL"| UI
    
    %% 2. Frontend talks to Backend
    UI ==>"2. API Requests (JSON + Bearer Token) HTTPS"| Backend
    Backend -.- >|"Returns Data/Confirmation"| UI

    %% 3. Backend talks to Database
    Backend <==>"3. Read/Write User Data, Tasks, Scores"| DB

    %% 4. The AI Flow
    Backend ==>"4. POST raw user goal prompt"| AI
    AI -.->|"5. Returns structured JSON task object (e.g., {'task': '...', 'points': 20})"| Backend

    %% --- Styling ---
    classDef hosting fill:#e3f2fd,stroke:#1565c0,stroke-width:2px,color:#000;
    classDef storage fill:#e8f5e9,stroke:#2e7d32,stroke-width:2px,color:#000;
    classDef ai fill:#f3e5f5,stroke:#7b1fa2,stroke-width:2px,color:#000;
    
    class VercelCloud,RenderCloud hosting;
    class DB storage;
    class AI ai;
```
