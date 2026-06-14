from fastapi import APIRouter
from pydantic import BaseModel
from services.meta_service import post_to_facebook, post_to_instagram, post_reel

router = APIRouter(prefix="/social", tags=["social"])

class FacebookPost(BaseModel):
    message: str
    image_url: str = None

class InstagramPost(BaseModel):
    image_url: str
    caption: str

class ReelPost(BaseModel):
    video_url: str
    caption: str

@router.post("/facebook")
async def facebook(req: FacebookPost):
    return await post_to_facebook(req.message, req.image_url)

@router.post("/instagram")
async def instagram(req: InstagramPost):
    return await post_to_instagram(req.image_url, req.caption)

@router.post("/reel")
async def reel(req: ReelPost):
    return await post_reel(req.video_url, req.caption)
