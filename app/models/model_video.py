# app/models/model_book.py
from sqlalchemy import Column, ForeignKey, Integer, String, DateTime, Text
from sqlalchemy.dialects.postgresql import JSONB

from app.models.model_base import BareBaseModel


class Video(BareBaseModel):
    id = Column(String, primary_key=True)
    news_id = Column(String, ForeignKey('news.news_id'), nullable=False)
    name = Column(String)
    result_url = Column(String)
    presenter_id = Column(String, ForeignKey('presenter.presenter_id'), nullable=False)
    uploaded_time = Column(DateTime)
    status = Column(String)
    # background = Column(Text)
    webhook = Column(String)
    # script = Column(JSONB)
    # config = Column(JSONB)
    # presenter_config = Column(JSONB)
    
