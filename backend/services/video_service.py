import os
from PIL import Image, ImageDraw, ImageFont
import io
import base64

def create_before_after_frames(before_path: str, after_path: str, clinic_name: str, treatment: str) -> list:
    frames = []
    before = Image.open(before_path).resize((1080, 1920)).convert("RGB")
    after = Image.open(after_path).resize((1080, 1920)).convert("RGB")

    def add_text(img, text, position, size=60, color=(255,255,255)):
        draw = ImageDraw.Draw(img)
        draw.rectangle([0, position[1]-10, 1080, position[1]+size+10], fill=(0,0,0,180))
        draw.text(position, text, fill=color)
        return img

    before_frame = before.copy()
    add_text(before_frame, f"Before {treatment}", (40, 80))
    add_text(before_frame, clinic_name, (40, 1800))
    frames.append(before_frame)

    after_frame = after.copy()
    add_text(after_frame, f"After {treatment}", (40, 80), color=(212, 175, 55))
    add_text(after_frame, "Book Your Consultation Today", (40, 1800))
    frames.append(after_frame)

    return frames

def frames_to_base64(frames: list) -> list:
    result = []
    for frame in frames:
        buf = io.BytesIO()
        frame.save(buf, format="JPEG")
        result.append(base64.b64encode(buf.getvalue()).decode())
    return result
