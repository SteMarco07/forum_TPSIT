from sqlalchemy import Column, Integer, String, UUID
from app.database import Base

class User(Base):
    __tablename__ = "users"

    uuid = Column(UUID, primary_key=True, index=True)
    username = Column(String, unique=True, nullable=False)
    password = Column(String, nullable=False)
    email = Column(String, unique=True, nullable=False)
    role = Column(String, nullable=False)
