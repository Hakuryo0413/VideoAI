# app/models/model_book.py
from sqlalchemy import Column, String

from app.models.model_base import BareBaseModel


class Presenter(BareBaseModel):
    presenter_id = Column(String, primary_key=True)
    name = Column(String)
    gender = Column(String)
    preview_url = Column(String)
    model_url = Column(String)
    modified_at = Column(String)
    talking_preview_url = Column(String)
    thumbnail_url = Column(String)
    image_url = Column(String)
    owner_id = Column(String)
    status = Column(String)
    video_url = Column(String)

