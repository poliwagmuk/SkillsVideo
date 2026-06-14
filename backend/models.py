from sqlalchemy import Column, Integer, String, Text, DateTime, Boolean, JSON
from sqlalchemy.sql import func
from database import Base

class Client(Base):
    __tablename__ = "clients"
    id = Column(Integer, primary_key=True)
    name = Column(String, nullable=False)
    clinic_name = Column(String)
    instagram_id = Column(String)
    facebook_page_id = Column(String)
    whatsapp_number = Column(String)
    brand_color = Column(String, default="#C9A96E")
    logo_url = Column(String)
    created_at = Column(DateTime, default=func.now())

class ScheduledPost(Base):
    __tablename__ = "scheduled_posts"
    id = Column(Integer, primary_key=True)
    client_id = Column(Integer)
    platform = Column(String)  # instagram, facebook, whatsapp
    content_type = Column(String)  # image, video, reel
    caption = Column(Text)
    media_url = Column(String)
    scheduled_at = Column(DateTime)
    posted = Column(Boolean, default=False)
    post_id = Column(String)
    created_at = Column(DateTime, default=func.now())

class GeneratedContent(Base):
    __tablename__ = "generated_content"
    id = Column(Integer, primary_key=True)
    client_id = Column(Integer)
    treatment = Column(String)
    caption = Column(Text)
    hashtags = Column(Text)
    script = Column(Text)
    media_url = Column(String)
    created_at = Column(DateTime, default=func.now())

class MediaItem(Base):
    __tablename__ = "media_items"
    id = Column(Integer, primary_key=True)
    source = Column(String)  # pexels, pixabay, upload
    url = Column(String)
    thumbnail = Column(String)
    media_type = Column(String)  # image, video
    tags = Column(String)
    created_at = Column(DateTime, default=func.now())
