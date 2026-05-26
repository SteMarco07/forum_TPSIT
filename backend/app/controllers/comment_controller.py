from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.comment_model import Comment, CommentCreate
from uuid import UUID

def get_comments_by_post(post_id: UUID, db: Session):
    return db.query(Comment).filter(Comment.post_id == post_id).all()

def get_number_of_comments_by_post(post_id: UUID, db: Session):
    return db.query(Comment).filter(Comment.post_id == post_id).count()

def get_comment_by_id(comment_id: UUID, db: Session):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    return comment

def create_comment(data: CommentCreate, author_id: UUID, db: Session):
    comment = Comment(**data.model_dump(), author_id=author_id)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    return comment

def update_comment(comment_id: UUID, data: CommentCreate, current_user_id: UUID, db: Session):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.author_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not your comment")
    for key, value in data.model_dump().items():
        setattr(comment, key, value)
    db.commit()
    db.refresh(comment)
    return comment

def delete_comment(comment_id: UUID, current_user_id: UUID, db: Session):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.author_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not your comment")
    db.delete(comment)
    db.commit()