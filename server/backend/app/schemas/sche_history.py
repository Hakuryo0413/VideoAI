from datetime import datetime
from typing import Optional
from xmlrpc.client import DateTime

from pydantic import BaseModel


class HistoryBase(BaseModel):
    video_id: Optional[str] = None
    status: Optional[str] = None
    reviewed_at: Optional[str] = None

    class Config:   
        orm_mode = True

class HistoryItemResponse(HistoryBase):
    history_id: str
    video_id: str
    status: str
    reviewed_at: Optional[datetime]

class HistoryCreateRequest(HistoryBase):
    history_id: str
    video_id: str
    status: str
    reviewed_at: Optional[str] = None

class HistoryUpdateRequest(BaseModel):
    history_id: str
    video_id: Optional[str]
    status: Optional[str]
    reviewed_at: Optional[datetime]