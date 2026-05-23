from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.models.post_model import PostCreate, PostResponse
from app.models.user_model import User
from app.controllers import post_controller
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/posts", tags=["Posts"])

@router.get("/", response_model=list[PostResponse])
def list_posts(db: Session = Depends(get_db)):
    return post_controller.get_all_posts(db)

@router.get("/topic/{topic_id}", response_model=list[PostResponse])
def list_posts_by_topic(topic_id: int, db: Session = Depends(get_db)):
    return post_controller.get_posts_by_topic(topic_id, db)

@router.get("/{post_id}", response_model=PostResponse)
def get_post(post_id: UUID, db: Session = Depends(get_db)):
    return post_controller.get_post_by_id(post_id, db)

@router.post("/", response_model=PostResponse, status_code=201)
def create_post(
    data: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return post_controller.create_post(data, current_user.id, db)

@router.put("/{post_id}", response_model=PostResponse)
def update_post(
    post_id: UUID,
    data: PostCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return post_controller.update_post(post_id, data, current_user.id, db)

@router.delete("/{post_id}", status_code=204)
def delete_post(
    post_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    post_controller.delete_post(post_id, current_user.id, db)