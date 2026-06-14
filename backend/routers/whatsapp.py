from fastapi import APIRouter
from pydantic import BaseModel
from services.whatsapp_service import send_message, send_image, send_template

router = APIRouter(prefix="/whatsapp", tags=["whatsapp"])

class TextMessage(BaseModel):
    to: str
    message: str

class ImageMessage(BaseModel):
    to: str
    image_url: str
    caption: str = ""

class TemplateMessage(BaseModel):
    to: str
    template_name: str
    language: str = "en_US"

@router.post("/send")
async def send(req: TextMessage):
    return await send_message(req.to, req.message)

@router.post("/send-image")
async def send_img(req: ImageMessage):
    return await send_image(req.to, req.image_url, req.caption)

@router.post("/send-template")
async def send_tmpl(req: TemplateMessage):
    return await send_template(req.to, req.template_name, req.language)
