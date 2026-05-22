from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.topic_model import Topic, TopicCreate
from uuid import UUID

def get_all_topics(db: Session):
    return db.query(Topic).all()

def get_topic_by_id(topic_id: UUID, db: Session):
    topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    return topic

def create_topic(data: TopicCreate, author_id: UUID, db: Session):
    topic = Topic(**data.model_dump(), author_id=author_id)
    db.add(topic)
    db.commit()
    db.refresh(topic)
    return topic

def delete_topic(topic_id: UUID, current_user_id: UUID, db: Session):
    topic = db.query(Topic).filter(Topic.id == topic_id).first()
    if not topic:
        raise HTTPException(status_code=404, detail="Topic not found")
    if topic.author_id != current_user_id:
        raise HTTPException(status_code=403, detail="Not your topic")
    db.delete(topic)
    db.commit()