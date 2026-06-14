import os
import httpx
from dotenv import load_dotenv

load_dotenv()
PEXELS_API_KEY = os.getenv("PEXELS_API_KEY")
BASE = "https://api.pexels.com"

async def search_photos(query: str, per_page: int = 12) -> list:
    if not PEXELS_API_KEY:
        return [{"id": i, "url": f"https://picsum.photos/400/600?random={i}", "thumbnail": f"https://picsum.photos/200/300?random={i}", "photographer": "Demo", "source": "pexels"} for i in range(per_page)]
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{BASE}/v1/search", params={"query": query, "per_page": per_page}, headers={"Authorization": PEXELS_API_KEY})
        data = r.json()
        return [{"id": p["id"], "url": p["src"]["large"], "thumbnail": p["src"]["medium"], "photographer": p["photographer"], "source": "pexels"} for p in data.get("photos", [])]

async def search_videos(query: str, per_page: int = 9) -> list:
    if not PEXELS_API_KEY:
        return [{"id": i, "url": "#", "thumbnail": f"https://picsum.photos/200/300?random={i+100}", "duration": 10, "source": "pexels"} for i in range(per_page)]
    async with httpx.AsyncClient() as client:
        r = await client.get(f"{BASE}/videos/search", params={"query": query, "per_page": per_page}, headers={"Authorization": PEXELS_API_KEY})
        data = r.json()
        return [{"id": v["id"], "url": v["video_files"][0]["link"] if v["video_files"] else "#", "thumbnail": v["image"], "duration": v["duration"], "source": "pexels"} for v in data.get("videos", [])]
