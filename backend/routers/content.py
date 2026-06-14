from fastapi import APIRouter
from pydantic import BaseModel
from services.openai_service import generate_caption, generate_script, generate_weekly_plan

router = APIRouter(prefix="/content", tags=["content"])

class CaptionRequest(BaseModel):
    treatment: str
    clinic_name: str
    tone: str = "luxury"

class ScriptRequest(BaseModel):
    treatment: str
    clinic_name: str
    duration: int = 30

class WeeklyPlanRequest(BaseModel):
    clinic_name: str
    treatments: list[str]

@router.post("/caption")
async def caption(req: CaptionRequest):
    return await generate_caption(req.treatment, req.clinic_name, req.tone)

@router.post("/script")
async def script(req: ScriptRequest):
    text = await generate_script(req.treatment, req.clinic_name, req.duration)
    return {"script": text}

@router.post("/weekly-plan")
async def weekly_plan(req: WeeklyPlanRequest):
    plan = await generate_weekly_plan(req.clinic_name, req.treatments)
    return {"plan": plan}
