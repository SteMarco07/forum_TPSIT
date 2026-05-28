from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.models.like_comment_model import LikeCommentResponse
from app.models.user_model import User
from app.controllers import like_comment_controller
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/likes/comments", tags=["Likes on Comments"])

@router.get("/{comment_id}", response_model=list[LikeCommentResponse])
def get_likes(comment_id: UUID, db: Session = Depends(get_db)):
    return like_comment_controller.get_likes_by_comment(comment_id, db)

@router.get("/comment/{comment_id}/count", response_model=LikeCommentResponse)
def get_number_of_likes_by_comment(comment_id: UUID, db: Session = Depends(get_db)):
    return {"count": like_comment_controller.get_number_of_likes_by_comment(comment_id, db)}

@router.post("/{comment_id}", response_model=LikeCommentResponse, status_code=201)
def like_comment(
    comment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return like_comment_controller.like_comment(comment_id, current_user.id, db)

@router.delete("/{comment_id}", status_code=204)
def unlike_comment(
    comment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    like_comment_controller.unlike_comment(comment_id, current_user.id, db)
