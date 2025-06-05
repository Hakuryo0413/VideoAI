import uuid
from app.models.model_history import VideoHistory
from app.schemas.sche_history import HistoryCreateRequest, HistoryUpdateRequest
from fastapi_sqlalchemy import db


class HistoryService(object):
    _instance = None

    def __init__(self) -> None:
        pass

    @staticmethod
    def get_history_list():
        return db.session.query(VideoHistory).all()
    
    @staticmethod
    def get_history_by_id(history_id: str):
        exist_history = db.session.query(VideoHistory).get(history_id)
        if exist_history is None:
            raise Exception('History not exists')
        return exist_history

    @staticmethod
    def update_status_history(history_id : str, data: HistoryUpdateRequest):
        history = db.session.query(VideoHistory).get(history_id)
        if history is None:
            raise Exception('History not exists')
        history.status = history.status if data.status is None else data.status
        db.session.commit()
        return data
    
    @staticmethod
    def get_history_by_video_id(video_id: str):
        exist_history = db.session.query(VideoHistory).filter(VideoHistory.video_id == video_id).first()
        if exist_history is None:
            raise Exception('History not exists')
        return exist_history
    
    @staticmethod
    def create_history(data: HistoryCreateRequest):
        new_history = VideoHistory(
            history_id= str(uuid.uuid4()),
            video_id=data.video_id,
            status=data.status,
        )
        db.session.add(new_history)
        db.session.commit()
        return new_history