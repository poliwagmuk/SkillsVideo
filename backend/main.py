from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base
from routers import content, media, social, whatsapp, video

Base.metadata.create_all(bind=engine)

app = FastAPI(title="SHAZ Marketing Studio", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(content.router)
app.include_router(media.router)
app.include_router(social.router)
app.include_router(whatsapp.router)
app.include_router(video.router)

@app.get("/")
def root():
    return {"app": "SHAZ Marketing Studio", "status": "running", "version": "1.0.0"}

@app.get("/health")
def health():
    import os
    return {
        "openai": bool(os.getenv("OPENAI_API_KEY")),
        "pexels": bool(os.getenv("PEXELS_API_KEY")),
        "pixabay": bool(os.getenv("PIXABAY_API_KEY")),
        "meta": bool(os.getenv("META_ACCESS_TOKEN")),
        "whatsapp": bool(os.getenv("WHATSAPP_TOKEN")),
    }
