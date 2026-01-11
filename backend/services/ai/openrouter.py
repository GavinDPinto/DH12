import aiohttp
import os
from typing import Optional

OPENROUTER_BASE_URL = "https://openrouter.ai/api/v1"

async def call_openrouter(prompt: str, model: str = "meta-llama/llama-3.2-3b-instruct:free") -> Optional[str]:
    """
    Call OpenRouter API with a prompt and return the response.
    
    Args:
        prompt: The prompt to send to the AI model
        model: The model to use (defaults to free Llama 3.2)
    
    Returns:
        The AI's response text or None if error occurs
    """
    api_key = os.getenv("OPENROUTER_API_KEY")
    if not api_key:
        raise ValueError("OPENROUTER_API_KEY environment variable not set")
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "model": model,
        "messages": [
            {
                "role": "user",
                "content": prompt
            }
        ],
        "temperature": 0.7,
    }
    
    try:
        async with aiohttp.ClientSession() as session:
            async with session.post(
                f"{OPENROUTER_BASE_URL}/chat/completions",
                headers=headers,
                json=payload
            ) as response:
                if response.status == 200:
                    data = await response.json()
                    return data["choices"][0]["message"]["content"]
                else:
                    error_text = await response.text()
                    raise Exception(f"OpenRouter API error: {response.status} - {error_text}")
    except Exception as e:
        print(f"Error calling OpenRouter: {e}")
        raise
