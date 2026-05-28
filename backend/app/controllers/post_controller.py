from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.post_model import Post, PostCreate
from uuid import UUID

def get_all_posts(db: Session):
    return db.query(Post).all()

def get_posts_by_topic(topic_id: int, db: Session):
    return db.query(Post).filter(Post.topic_id == topic_id).all()

def get_post_by_id(post_id: UUID, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    return post

def create_post(data: PostCreate, author_id: UUID, db: Session):
    post = Post(**data.model_dump(), author_id=author_id)
    db.add(post)
    db.commit()
    db.refresh(post)
    return post

def delete_post(post_id: UUID, current_user_id: UUID, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not your post")
    db.delete(post)
    db.commit()

def update_post(post_id: UUID, data: PostCreate, current_user_id: UUID, db: Session):
    post = db.query(Post).filter(Post.id == post_id).first()
    if not post:
        raise HTTPException(status_code=404, detail="Post not found")
    if post.author_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not your post")
    for key, value in data.model_dump().items():
        setattr(post, key, value)
    db.commit()
    db.refresh(post)
    return post