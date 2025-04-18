from typing import List
import uuid
from app.models import News
from app.schemas.sche_news import NewsCreateRequest, NewsItemResponse, NewsUpdateRequest
from fastapi_sqlalchemy import db
from bs4 import BeautifulSoup  # Sử dụng thư viện BeautifulSoup để phân tích HTML
from app.models.model_video import Video


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
    
    @staticmethod
    def delete_news(news_id: str):
        news = db.session.query(News).get(news_id)
        if news is None:
            raise Exception('News not exists')
        video = db.session.query(Video).filter(Video.news_id == news_id).first()
        if video is not None:
            raise Exception('Cannot delete news as it is referenced in a video')
        db.session.delete(news)
        db.session.commit()
        return news

    @staticmethod
    def parse_news_from_file(file_path: str) -> List[NewsItemResponse]:
        news_list = []
        print("tramxinhhh")

    # Đọc nội dung file HTML
        with open(file_path, "r", encoding="utf-8") as file:
            html_content = file.read()
        file = html_content
    
    # Phân tích nội dung HTML
        soup = BeautifulSoup(html_content, "html.parser")
    # Tìm tất cả các thẻ <h1> và <h2>
        h1_tags = soup.find_all("h1")
        h2_tags = soup.find_all("h2")
        h3_tags = soup.find_all("h3")
        h4_tags = soup.find_all("h4")
    # Kiểm tra số lượng thẻ <h1> và <h2> phải bằng nhau
        if len(h1_tags) != len(h2_tags):
            raise ValueError("Số lượng thẻ <h1> và <h2> không khớp.")

    # Trích xuất tiêu đề và nội dung
        for h1, h2, h3, h4 in zip(h1_tags, h2_tags, h3_tags, h4_tags):
            title = h1.get_text(strip=True)  # Lấy nội dung của thẻ <h1>
            content = h2.get_text(strip=True)  # Lấy nội dung của thẻ <h2>
            category = h3.get_text(strip=True)
            url = h4.get_text(strip=True)
            news_id = str(uuid.uuid4())  # Tạo một UUID ngẫu nhiên
            news_item = NewsItemResponse(news_id=news_id,news_title=title, summary=content, category=category, source_url=url)
            news_list.append(news_item)
        return news_list