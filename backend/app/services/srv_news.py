from app.models import News
from app.schemas.sche_news import NewsCreateRequest, NewsUpdateRequest
from fastapi_sqlalchemy import db


class NewsService(object):
    _instance = None

    def __init__(self) -> None:
        pass

    @staticmethod
    def get_news_list():
        return db.session.query(News).all()
    
    @staticmethod
    def get_news_by_id(news_id: str):
        exist_news = db.session.query(News).get(news_id)
        if exist_news is None:
            raise Exception('News not exists')
        return exist_news

    @staticmethod
    def create_news(data: NewsCreateRequest):
        new_news = News(
            news_id=data.news_id,
            news_title=data.news_title,
            summary=data.summary,
            source_url=data.source_url,
            category=data.category
        )
        db.session.add(new_news)
        db.session.commit()
        return new_news
    
    @staticmethod
    def update_news(news_id : int, data: NewsUpdateRequest):
        news = db.session.query(News).get(news_id)
        if news is None:
            raise Exception('News not exists')
        news.news_title = news.news_title if data.news_title is None else data.news_title
        news.summary = news.summary if data.summary is None else data.summary
        news.source_url = news.source_url if data.source_url is None else data.source_url
        news.category = news.category if data.category is None else data.category
        db.session.commit()
        return news
    
    