from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from uuid import UUID
from app.database import get_db
from app.models.comment_model import CommentCreate, CommentResponse
from app.models.user_model import User
from app.controllers import comment_controller
from app.core.dependencies import get_current_user

router = APIRouter(prefix="/comments", tags=["Comments"])

@router.get("/post/{post_id}", response_model=list[CommentResponse])
def list_comments_by_post(post_id: UUID, db: Session = Depends(get_db)):
    return comment_controller.get_comments_by_post(post_id, db)

@router.get("/{comment_id}", response_model=CommentResponse)
def get_comment(comment_id: UUID, db: Session = Depends(get_db)):
    return comment_controller.get_comment_by_id(comment_id, db)

@router.post("/", response_model=CommentResponse, status_code=201)
def create_comment(
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return comment_controller.create_comment(data, current_user.id, db)

@router.put("/{comment_id}", response_model=CommentResponse)
def update_comment(
    comment_id: UUID,
    data: CommentCreate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    return comment_controller.update_comment(comment_id, data, current_user.id, db)

@router.delete("/{comment_id}", status_code=204)
def delete_comment(
    comment_id: UUID,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    comment_controller.delete_comment(comment_id, current_user.id, db)