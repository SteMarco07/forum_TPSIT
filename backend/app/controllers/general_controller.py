from sqlalchemy.orm import Session
from sqlalchemy import func
from fastapi import HTTPException
from uuid import UUID
from app.schemas.general_schema import PostFullResponse
from app.models.post_model import Post
from app.models.user_model import User
from app.models.topic_model import Topic
from app.models.comment_model import Comment
from app.models.like_post_model import LikePost

def get_all_posts_full(db: Session):
    rows = db.query(
        Post,
        User.username.label("author_username"),
        Topic.title.label("topic_name"),
        func.count(LikePost.id).label("likes_count"),
        func.count(Comment.id).label("comments_count")
    ).join(User, Post.author_id == User.id
    ).join(Topic, Post.topic_id == Topic.id
    ).outerjoin(LikePost, LikePost.post_id == Post.id
    ).outerjoin(Comment, Comment.post_id == Post.id
    ).group_by(Post.id, User.username, Topic.title
    ).all()

    return [
        PostFullResponse(
            id=row.Post.id,
            title=row.Post.title,
            content_text=row.Post.content_text,
            author_id=row.Post.author_id,
            topic_id=row.Post.topic_id,
            author_username=row.author_username,
            topic_name=row.topic_name,
            likes_count=row.likes_count,
            comments_count=row.comments_count
        )
        for row in rows
    ]
    
def get_post_full_by_topic(topic_id: int, db: Session):
    rows = db.query(
        Post,
        User.username.label("author_username"),
        Topic.title.label("topic_name"),
        func.count(LikePost.id).label("likes_count"),
        func.count(Comment.id).label("comments_count")
    ).join(User, Post.author_id == User.id
    ).join(Topic, Post.topic_id == Topic.id
    ).outerjoin(LikePost, LikePost.post_id == Post.id
    ).outerjoin(Comment, Comment.post_id == Post.id
    ).filter(Post.topic_id == topic_id
    ).group_by(Post.id, User.username, Topic.title).all()

    if not rows:
        raise HTTPException(status_code=404, detail="No posts found")

    return [
        PostFullResponse(
            id=row.Post.id,
            title=row.Post.title,
            content_text=row.Post.content_text,
            author_id=row.Post.author_id,
            topic_id=row.Post.topic_id,
            author_username=row.author_username,
            topic_name=row.topic_name,
            likes_count=row.likes_count,
            comments_count=row.comments_count
        )
        for row in rows
    ]
