from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.sub_topic_model import SubTopic
from uuid import UUID

def get_subs_by_topic(topic_id: int, db: Session):
    return db.query(SubTopic).filter(SubTopic.topic_id == topic_id).all()

def get_subs_by_user(user_id: UUID, db: Session):
    return db.query(SubTopic).filter(SubTopic.user_id == user_id).all()

def subscribe(topic_id: int, user_id: UUID, db: Session):
    existing = db.query(SubTopic).filter(
        SubTopic.topic_id == topic_id,
        SubTopic.user_id == user_id
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="Already subscribed to this topic")

    sub = SubTopic(topic_id=topic_id, user_id=user_id)
    db.add(sub)
    db.commit()
    db.refresh(sub)
    return sub

def unsubscribe(topic_id: int, user_id: UUID, db: Session):
    sub = db.query(SubTopic).filter(
        SubTopic.topic_id == topic_id,
        SubTopic.user_id == user_id
    ).first()
    if not sub:
        raise HTTPException(status_code=404, detail="Not subscribed to this topic")
    db.delete(sub)
    db.commit()
