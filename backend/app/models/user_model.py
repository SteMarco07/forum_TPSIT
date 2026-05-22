from sqlmodel import SQLModel, Field
from uuid import UUID, uuid4
from typing import Optional

class UserBase(SQLModel):
    username: str
    email: str
    role: str = "USER"

class UserCreate(UserBase):
    password: str

class User(UserBase, table=True):
    __tablename__ = "users"
    
    id: UUID = Field(default_factory=uuid4, primary_key=True)
    password: str

class UserResponse(UserBase):
    id: UUID