from app.models import News
from app.models.model_presenter import Presenter
from app.schemas.sche_news import NewsUpdateRequest
from fastapi_sqlalchemy import db

from app.schemas.sche_presenter import PresenterCreateRequest


class PresenterService(object):
    _instance = None

    def __init__(self) -> None:
        pass

    @staticmethod
    def get_presenter_list():
        return db.session.query(Presenter).all()
    
    @staticmethod
    def get_presenter_by_id(presenter_id: str):
        exist_presenter = db.session.query(Presenter).get(presenter_id)
        if exist_presenter is None:
            raise Exception('Presenter not exists')
        return exist_presenter
    

    @staticmethod
    def create_presenter(data: PresenterCreateRequest):
        new_presenter = Presenter(
            presenter_id=data.presenter_id,
            name=data.name,
            gender=data.gender,
            preview_url=data.preview_url,
            model_url=data.model_url,
            modified_at=data.modified_at,
            talking_preview_url=data.talking_preview_url,
            thumbnail_url=data.thumbnail_url,
            image_url=data.image_url,
            owner_id=data.owner_id,
            video_url=data.video_url,
            status=data.status)
        db.session.add(new_presenter)
        db.session.commit()
        return new_presenter
