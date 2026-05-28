from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.moderator_model import Moderator, ModeratorCreate
from typing import Optional
from uuid import UUID

def get_moderators_by_topic(topic_id: int, db: Session):
    return db.query(Moderator).filter(Moderator.topic_id == topic_id).all()

def get_moderator_by_id(moderator_id: int, db: Session):
    moderator = db.query(Moderator).filter(Moderator.id == moderator_id).first()
    if not moderator:
        raise HTTPException(status_code=404, detail="Moderator not found")
    return moderator

def assign_moderator(data: ModeratorCreate, db: Session):
    existing = db.query(Moderator).filter(
        Moderator.user_id == data.user_id,
        Moderator.topic_id == data.topic_id
    ).first()
    if existing:
        raise HTTPException(status_code=409, detail="User is already a moderator for this topic")

    moderator = Moderator(**data.model_dump())
    db.add(moderator)
    db.commit()
    db.refresh(moderator)
    return moderator

def update_moderator_role(moderator_id: int, role: Optional[str], db: Session):
    moderator = db.query(Moderator).filter(Moderator.id == moderator_id).first()
    if not moderator:
        raise HTTPException(status_code=404, detail="Moderator not found")
    moderator.role = role
    db.commit()
    db.refresh(moderator)
    return moderator

def remove_moderator(moderator_id: int, db: Session):
    moderator = db.query(Moderator).filter(Moderator.id == moderator_id).first()
    if not moderator:
        raise HTTPException(status_code=404, detail="Moderator not found")
    db.delete(moderator)
    db.commit()
