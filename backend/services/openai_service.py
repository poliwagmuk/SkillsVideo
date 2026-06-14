import os
from openai import AsyncOpenAI
from dotenv import load_dotenv

load_dotenv()
client = AsyncOpenAI(api_key=os.getenv("OPENAI_API_KEY"))

async def generate_caption(treatment: str, clinic_name: str, tone: str = "luxury") -> dict:
    if not os.getenv("OPENAI_API_KEY"):
        return {
            "caption": f"✨ Transform your skin with {treatment} at {clinic_name}. Experience the difference today.",
            "hashtags": f"#{treatment.replace(' ','')} #{clinic_name.replace(' ','')} #aesthetics #skincare #glowup",
            "note": "Demo mode — add OPENAI_API_KEY for AI-generated content"
        }
    prompt = f"""You are a luxury aesthetic clinic marketing expert.
Write a compelling Instagram/Facebook caption for {clinic_name} promoting {treatment}.
Tone: {tone}, professional, trustworthy.
Include: benefit, emotional hook, soft CTA.
Also provide 10 relevant hashtags.
Return JSON: {{"caption": "...", "hashtags": "..."}}"""
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    import json
    return json.loads(response.choices[0].message.content)

async def generate_script(treatment: str, clinic_name: str, duration: int = 30) -> str:
    if not os.getenv("OPENAI_API_KEY"):
        return f"[DEMO SCRIPT]\n\nScene 1 (0-5s): Close-up of treatment area before {treatment}.\nScene 2 (5-20s): Professional therapist performing {treatment} at {clinic_name}.\nScene 3 (20-{duration}s): Reveal the results. CTA: Book your consultation today."
    prompt = f"""Write a {duration}-second video ad script for {clinic_name} promoting {treatment}.
Include scene directions, voiceover text, and on-screen text overlays.
Tone: luxury, clinical, trustworthy. No medical claims."""
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

async def generate_weekly_plan(clinic_name: str, treatments: list) -> list:
    if not os.getenv("OPENAI_API_KEY"):
        days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"]
        return [{"day": d, "treatment": treatments[i % len(treatments)], "content_type": ["Reel","Post","Story"][i%3]} for i, d in enumerate(days)]
    prompt = f"""Create a 7-day social media content plan for {clinic_name}.
Treatments: {', '.join(treatments)}.
Mix: Reels, Posts, Stories, before/after reveals.
Return JSON array: [{{"day":"Monday","treatment":"...","content_type":"...","caption_idea":"..."}}]"""
    response = await client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"}
    )
    import json
    data = json.loads(response.choices[0].message.content)
    return data.get("plan", data)
