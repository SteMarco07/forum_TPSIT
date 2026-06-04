from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.comment_model import Comment, CommentCreate
from app.models.user_model import User
from uuid import UUID

def get_comments_by_post(post_id: UUID, db: Session):
    rows = db.query(Comment, User.username.label("author_username")).join(User, Comment.author_id == User.id).filter(Comment.post_id == post_id).all()
    results = []
    for comment, author_username in rows:
        results.append({
            "id": comment.id,
            "content_text": comment.content_text,
            "author_id": comment.author_id,
            "post_id": comment.post_id,
            "author_username": author_username,
        })
    return results

def get_number_of_comments_by_post(post_id: UUID, db: Session):
    return db.query(Comment).filter(Comment.post_id == post_id).count()

def get_comment_by_id(comment_id: UUID, db: Session):
    row = db.query(Comment, User.username.label("author_username")).join(User, Comment.author_id == User.id).filter(Comment.id == comment_id).first()
    if not row:
        raise HTTPException(status_code=404, detail="Comment not found")
    comment, author_username = row
    return {
        "id": comment.id,
        "content_text": comment.content_text,
        "author_id": comment.author_id,
        "post_id": comment.post_id,
        "author_username": author_username,
    }

def create_comment(data: CommentCreate, author_id: UUID, db: Session):
    comment = Comment(**data.model_dump(), author_id=author_id)
    db.add(comment)
    db.commit()
    db.refresh(comment)
    author_username = db.query(User.username).filter(User.id == author_id).scalar()
    return {
        "id": comment.id,
        "content_text": comment.content_text,
        "author_id": comment.author_id,
        "post_id": comment.post_id,
        "author_username": author_username,
    }

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
    author_username = db.query(User.username).filter(User.id == comment.author_id).scalar()
    return {
        "id": comment.id,
        "content_text": comment.content_text,
        "author_id": comment.author_id,
        "post_id": comment.post_id,
        "author_username": author_username,
    }

def delete_comment(comment_id: UUID, current_user_id: UUID, db: Session):
    comment = db.query(Comment).filter(Comment.id == comment_id).first()
    if not comment:
        raise HTTPException(status_code=404, detail="Comment not found")
    if comment.author_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not your comment")
    db.delete(comment)
    db.commit()