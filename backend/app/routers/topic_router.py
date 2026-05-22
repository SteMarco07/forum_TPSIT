from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.controllers import topic_controller
from app.core.dependencies import get_current_user
from app.models.topic_model import TopicCreate, TopicResponse
from app.models.user_model import User

router = APIRouter(prefix="/topics", tags=["Topics"])

@router.get("/", response_model=list[TopicResponse])
def list_topics(db: Session = Depends(get_db)):
    return topic_controller.get_all_topics(db)

@router.get("/{topic_id}", response_model=TopicResponse)
def get_topic(topic_id: UUID, db: Session = Depends(get_db)):
    return topic_controller.get_topic_by_id(topic_id, db)

@router.post("/", response_model=TopicResponse, status_code=201)
def create_topic(
    data: TopicCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return topic_controller.create_topic(data, current_user.uuid, db)

@router.delete("/{topic_id}", status_code=204)
def delete_topic(
    topic_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    topic_controller.delete_topic(topic_id, current_user.uuid, db)