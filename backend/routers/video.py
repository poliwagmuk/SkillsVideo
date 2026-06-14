from fastapi import APIRouter, UploadFile, File, Form
from services.video_service import create_before_after_frames, frames_to_base64
import tempfile, os

router = APIRouter(prefix="/video", tags=["video"])

@router.post("/before-after")
async def before_after(
    before: UploadFile = File(...),
    after: UploadFile = File(...),
    clinic_name: str = Form("SHAZ Clinic"),
    treatment: str = Form("HIFU Treatment")
):
    with tempfile.TemporaryDirectory() as tmpdir:
        before_path = os.path.join(tmpdir, "before.jpg")
        after_path = os.path.join(tmpdir, "after.jpg")
        with open(before_path, "wb") as f:
            f.write(await before.read())
        with open(after_path, "wb") as f:
            f.write(await after.read())
        frames = create_before_after_frames(before_path, after_path, clinic_name, treatment)
        encoded = frames_to_base64(frames)
    return {"frames": encoded, "count": len(encoded)}
