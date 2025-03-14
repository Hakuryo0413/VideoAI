from typing import Optional

from pydantic import BaseModel


class NewsBase(BaseModel):
    news_title: Optional[str] = None
    summary: Optional[str] = None
    source_url: Optional[str] = None
    category: Optional[str] = None

    class Config:
        orm_mode = True

class NewsItemResponse(NewsBase):
    news_id: str
    news_title: str
    summary: str
    source_url: str
    category: str

class NewsCreateRequest(NewsBase):
    news_id: str
    news_title: str
    summary: str
    source_url: str
    category: str

class NewsUpdateRequest(BaseModel):
    news_id: str
    news_title: Optional[str]
    summary: Optional[str]
    source_url: Optional[str]
    category: Optional[str]