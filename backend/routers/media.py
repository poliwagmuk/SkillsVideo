from fastapi import APIRouter
from services.pexels_service import search_photos as pexels_photos, search_videos as pexels_videos
from services.pixabay_service import search_photos as pixabay_photos, search_videos as pixabay_videos

router = APIRouter(prefix="/media", tags=["media"])

@router.get("/photos")
async def photos(query: str = "aesthetic clinic", source: str = "all", per_page: int = 12):
    results = []
    if source in ("all", "pexels"):
        results += await pexels_photos(query, per_page)
    if source in ("all", "pixabay"):
        results += await pixabay_photos(query, per_page)
    return {"results": results, "total": len(results)}

@router.get("/videos")
async def videos(query: str = "spa treatment", source: str = "all", per_page: int = 9):
    results = []
    if source in ("all", "pexels"):
        results += await pexels_videos(query, per_page)
    if source in ("all", "pixabay"):
        results += await pixabay_videos(query, per_page)
    return {"results": results, "total": len(results)}
