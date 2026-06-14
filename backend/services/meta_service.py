import os
import httpx
from dotenv import load_dotenv

load_dotenv()
ACCESS_TOKEN = os.getenv("META_ACCESS_TOKEN")
PAGE_ID = os.getenv("META_PAGE_ID")
IG_ID = os.getenv("META_INSTAGRAM_ID")
BASE = "https://graph.facebook.com/v19.0"

async def post_to_facebook(message: str, image_url: str = None) -> dict:
    if not ACCESS_TOKEN:
        return {"success": False, "note": "Add META_ACCESS_TOKEN to .env", "demo": True}
    async with httpx.AsyncClient() as client:
        params = {"message": message, "access_token": ACCESS_TOKEN}
        if image_url:
            params["url"] = image_url
            r = await client.post(f"{BASE}/{PAGE_ID}/photos", params=params)
        else:
            r = await client.post(f"{BASE}/{PAGE_ID}/feed", params=params)
        return r.json()

async def post_to_instagram(image_url: str, caption: str) -> dict:
    if not ACCESS_TOKEN or not IG_ID:
        return {"success": False, "note": "Add META_ACCESS_TOKEN and META_INSTAGRAM_ID to .env", "demo": True}
    async with httpx.AsyncClient() as client:
        r = await client.post(f"{BASE}/{IG_ID}/media", params={"image_url": image_url, "caption": caption, "access_token": ACCESS_TOKEN})
        data = r.json()
        if "id" in data:
            r2 = await client.post(f"{BASE}/{IG_ID}/media_publish", params={"creation_id": data["id"], "access_token": ACCESS_TOKEN})
            return r2.json()
        return data

async def post_reel(video_url: str, caption: str) -> dict:
    if not ACCESS_TOKEN or not IG_ID:
        return {"success": False, "note": "Add META_ACCESS_TOKEN and META_INSTAGRAM_ID to .env", "demo": True}
    async with httpx.AsyncClient() as client:
        r = await client.post(f"{BASE}/{IG_ID}/media", params={"media_type": "REELS", "video_url": video_url, "caption": caption, "access_token": ACCESS_TOKEN})
        data = r.json()
        if "id" in data:
            r2 = await client.post(f"{BASE}/{IG_ID}/media_publish", params={"creation_id": data["id"], "access_token": ACCESS_TOKEN})
            return r2.json()
        return data
