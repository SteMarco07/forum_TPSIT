from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.user_model import User
from app.schemas.user_schema import UserCreate
from app.core.security import hash_password

def get_all_users(db: Session):
    return db.query(User).all()

def get_user_by_id(user_uuid: int, db: Session):
    user = db.query(User).filter(User.uuid == user_uuid).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    return user

def create_user(data: UserCreate, db: Session):
    hashed = hash_password(data.password)
    user = User(name=data.name, email=data.email, password=hashed)
    db.add(user)
    db.commit()
    db.refresh(user)
    return user
