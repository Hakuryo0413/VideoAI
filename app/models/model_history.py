# app/models/model_book.py
from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text

from app.models.model_base import BareBaseModel


class VideoHistory(BareBaseModel):
    history_id = Column(String, primary_key=True)
    video_id = Column(String, ForeignKey('video.id'), nullable=False)
    status = Column(String(255))
    reviewed_at = Column(DateTime)
    