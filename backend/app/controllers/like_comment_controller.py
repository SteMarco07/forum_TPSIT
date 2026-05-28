from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.like_comment_model import LikeComment
from uuid import UUID

def get_likes_by_comment(comment_id: UUID, db: Session):
    return db.query(LikeComment).filter(LikeComment.comment_id == comment_id).all()

def get_number_of_likes_by_comment(comment_id: UUID, db: Session):
    return db.query(LikeComment).filter(LikeComment.comment_id == comment_id).count()

def like_comment(comment_id: UUID, user_id: UUID, db: Session):
    existing = db.query(LikeComment).filter(
        LikeComment.comment_id == comment_id,
        LikeComment.user_id == user_id
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="You already liked this comment")

    like = LikeComment(comment_id=comment_id, user_id=user_id)
    db.add(like)
    db.commit()
    db.refresh(like)
    return like

def unlike_comment(comment_id: UUID, user_id: UUID, db: Session):
    like = db.query(LikeComment).filter(
        LikeComment.comment_id == comment_id,
        LikeComment.user_id == user_id
    ).first()
    if not like:
        raise HTTPException(status_code=404, detail="You have not liked this comment")
    db.delete(like)
    db.commit()
    