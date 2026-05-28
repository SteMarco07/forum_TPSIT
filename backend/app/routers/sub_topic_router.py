from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.models.sub_topic_model import SubTopicResponse
from app.models.user_model import User
from app.controllers import sub_topic_controller
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/subs", tags=["Subs to Topic"])

@router.get("/topic/{topic_id}", response_model=list[SubTopicResponse])
def get_subs_by_topic(topic_id: int, db: Session = Depends(get_db)):
    return sub_topic_controller.get_subs_by_topic(topic_id, db)

@router.get("/me", response_model=list[SubTopicResponse])
def get_my_subs(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return sub_topic_controller.get_subs_by_user(current_user.id, db)

@router.post("/{topic_id}", response_model=SubTopicResponse, status_code=201)
def subscribe(
    topic_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return sub_topic_controller.subscribe(topic_id, current_user.id, db)

@router.delete("/{topic_id}", status_code=204)
def unsubscribe(
    topic_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    sub_topic_controller.unsubscribe(topic_id, current_user.id, db)
