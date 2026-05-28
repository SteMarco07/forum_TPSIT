from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.like_post_model import LikePost
from uuid import UUID

def get_likes_by_post(post_id: UUID, db: Session):
    return db.query(LikePost).filter(LikePost.post_id == post_id).all()

def get_number_of_likes_by_post(post_id: UUID, db: Session):
    return db.query(LikePost).filter(LikePost.post_id == post_id).count()

def like_post(post_id: UUID, user_id: UUID, db: Session):
    # Prevent duplicate likes
    existing = db.query(LikePost).filter(
        LikePost.post_id == post_id,
        LikePost.user_id == user_id
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="You already liked this post")

    like = LikePost(post_id=post_id, user_id=user_id)
    db.add(like)
    db.commit()
    db.refresh(like)
    return like

def unlike_post(post_id: UUID, user_id: UUID, db: Session):
    like = db.query(LikePost).filter(
        LikePost.post_id == post_id,
        LikePost.user_id == user_id
    ).first()
    if not like:
        raise HTTPException(status_code=404, detail="You have not liked this post")
    db.delete(like)
    db.commit()
