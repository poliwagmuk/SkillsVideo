import os
import httpx
from dotenv import load_dotenv

load_dotenv()
PIXABAY_API_KEY = os.getenv("PIXABAY_API_KEY")
BASE = "https://pixabay.com/api"

async def search_photos(query: str, per_page: int = 12) -> list:
    if not PIXABAY_API_KEY:
        return [{"id": i+200, "url": f"https://picsum.photos/400/600?random={i+200}", "thumbnail": f"https://picsum.photos/200/300?random={i+200}", "source": "pixabay"} for i in range(per_page)]
    async with httpx.AsyncClient() as client:
        r = await client.get(BASE + "/", params={"key": PIXABAY_API_KEY, "q": query, "per_page": per_page, "image_type": "photo"})
        data = r.json()
        return [{"id": h["id"], "url": h["largeImageURL"], "thumbnail": h["previewURL"], "source": "pixabay"} for h in data.get("hits", [])]

async def search_videos(query: str, per_page: int = 9) -> list:
    if not PIXABAY_API_KEY:
        return [{"id": i+300, "url": "#", "thumbnail": f"https://picsum.photos/200/300?random={i+300}", "source": "pixabay"} for i in range(per_page)]
    async with httpx.AsyncClient() as client:
        r = await client.get(BASE + "/videos/", params={"key": PIXABAY_API_KEY, "q": query, "per_page": per_page})
        data = r.json()
        return [{"id": h["id"], "url": h["videos"]["medium"]["url"], "thumbnail": h["picture_id"], "source": "pixabay"} for h in data.get("hits", [])]
