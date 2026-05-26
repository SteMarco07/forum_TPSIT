from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.models.like_post_model import LikePostResponse
from app.models.user_model import User
from app.controllers import like_post_controller
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/likes/posts", tags=["Likes on Posts"])

@router.get("/{post_id}", response_model=list[LikePostResponse])
def get_likes(post_id: UUID, db: Session = Depends(get_db)):
    return like_post_controller.get_likes_by_post(post_id, db)

@router.get("/post/{post_id}/count", response_model=LikePostResponse)
def get_number_of_likes_by_post(post_id: UUID, db: Session = Depends(get_db)):
    return {"count": like_post_controller.get_number_of_likes_by_post(post_id, db)}

@router.post("/{post_id}", response_model=LikePostResponse, status_code=201)
def like_post(
    post_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return like_post_controller.like_post(post_id, current_user.id, db)

@router.delete("/{post_id}", status_code=204)
def unlike_post(
    post_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    like_post_controller.unlike_post(post_id, current_user.id, db)