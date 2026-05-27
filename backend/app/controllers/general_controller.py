from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from uuid import UUID
from app.models.post_model import Post
from app.models.user_model import User
from app.models.topic_model import Topic
from app.models.comment_model import Comment
from app.models.like_post_model import LikePost

def get_all_posts_full(db: Session):
    return db.query(
        Post,
        User.username.label("author_username"),
        Topic.name.label("topic_name"),
        func.count(LikePost.id).label("likes_count"),
        func.count(Comment.id).label("comments_count")
    ).join(User, Post.author_id == User.id
    ).join(Topic, Post.topic_id == Topic.id
    ).outerjoin(LikePost, LikePost.post_id == Post.id
    ).outerjoin(Comment, Comment.post_id == Post.id
    ).group_by(Post.id, User.username, Topic.name).all()
    
def get_post_full_by_topic(post_id: UUID, db: Session):
    return db.query(
        Post,
        User.username.label("author_username"),
        Topic.name.label("topic_name"),
        func.count(LikePost.id).label("likes_count"),
        func.count(Comment.id).label("comments_count")
    ).join(User, Post.author_id == User.id
    ).join(Topic, Post.topic_id == Topic.id
    ).outerjoin(LikePost, LikePost.post_id == Post.id
    ).outerjoin(Comment, Comment.post_id == Post.id
    ).filter(Post.id == post_id
    ).group_by(Post.id, User.username, Topic.name).first()


