# app/models/model_book.py
from sqlalchemy import Column, Integer, String, DateTime, Text

from app.models.model_base import BareBaseModel


class News(BareBaseModel):
    news_id = Column(String, primary_key=True)
    news_title = Column(String)
    summary = Column(Text)
    source_url = Column(String)
    category = Column(String)
