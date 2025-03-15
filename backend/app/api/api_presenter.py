import os
from typing import Any
from dotenv import load_dotenv
from fastapi import APIRouter, Depends, HTTPException
import requests
import logging

from app.models.model_presenter import Presenter
from app.schemas.sche_base import DataResponse
from app.schemas.sche_presenter import PresenterCreateRequest, PresenterItemResponse
from app.services.srv_presenter import PresenterService

load_dotenv()
router = APIRouter()
api_key= os.getenv('D_ID_API_KEY')
api_url = os.getenv('D_ID_BASE_URL')
logger = logging.getLogger()
headers = {
        'authorization': api_key,
        'accept': 'application/json',
    }

@router.get('/get_firstpresenter', response_model=PresenterItemResponse)
def first_presenter(presenter_service: PresenterService = Depends()) -> Any:
    try:
        response = requests.get(f"{api_url}/clips/presenters?limit=100", headers=headers)
        all_presenters = response.json()
        presenter1 = all_presenters["presenters"][0]
        return presenter1
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))

@router.post('', response_model=DataResponse[PresenterItemResponse])
def create_presenter(presenter_data: PresenterCreateRequest, presenter_service: PresenterService = Depends()) -> Any:
    try:
        response = requests.get(f"{api_url}/clips/presenters?limit=100", headers=headers)
        all_presenters = response.json()
        presenter1 = all_presenters["presenters"][0]
        presenter_data = PresenterCreateRequest(
            presenter_id=presenter1["presenter_id"],
            name=presenter1["name"],
            gender=presenter1["gender"],
            preview_url=presenter1["preview_url"],
            model_url=presenter1.get("model_url"),
            modified_at=presenter1["modified_at"],
            talking_preview_url=presenter1["talking_preview_url"],
            thumbnail_url=presenter1["thumbnail_url"],
            image_url=presenter1["image_url"],
            owner_id=presenter1["owner_id"],
            status=presenter1["status"],
            video_url=presenter1.get("video_url")  # Có thể None nếu API không có
        )
        print("New: ", presenter1)
        new_presenter = presenter_service.create_presenter(presenter_data)
        print("new_presenter: ", new_presenter)
        return DataResponse().success_response(data=new_presenter)
    except Exception as e:
        return HTTPException(status_code=400, detail=logger.error(e))