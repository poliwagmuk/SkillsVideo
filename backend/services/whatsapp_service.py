import os
import httpx
from dotenv import load_dotenv

load_dotenv()
TOKEN = os.getenv("WHATSAPP_TOKEN")
PHONE_ID = os.getenv("WHATSAPP_PHONE_NUMBER_ID")
BASE = "https://graph.facebook.com/v19.0"

async def send_message(to: str, message: str) -> dict:
    if not TOKEN:
        return {"success": False, "note": "Add WHATSAPP_TOKEN to .env", "demo": True}
    async with httpx.AsyncClient() as client:
        r = await client.post(
            f"{BASE}/{PHONE_ID}/messages",
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
            json={"messaging_product": "whatsapp", "to": to, "type": "text", "text": {"body": message}}
        )
        return r.json()

async def send_image(to: str, image_url: str, caption: str = "") -> dict:
    if not TOKEN:
        return {"success": False, "note": "Add WHATSAPP_TOKEN to .env", "demo": True}
    async with httpx.AsyncClient() as client:
        r = await client.post(
            f"{BASE}/{PHONE_ID}/messages",
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
            json={"messaging_product": "whatsapp", "to": to, "type": "image", "image": {"link": image_url, "caption": caption}}
        )
        return r.json()

async def send_template(to: str, template_name: str, language: str = "en_US") -> dict:
    if not TOKEN:
        return {"success": False, "note": "Add WHATSAPP_TOKEN to .env", "demo": True}
    async with httpx.AsyncClient() as client:
        r = await client.post(
            f"{BASE}/{PHONE_ID}/messages",
            headers={"Authorization": f"Bearer {TOKEN}", "Content-Type": "application/json"},
            json={"messaging_product": "whatsapp", "to": to, "type": "template", "template": {"name": template_name, "language": {"code": language}}}
        )
        return r.json()
