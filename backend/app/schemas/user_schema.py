from pydantic import BaseModel, EmailStr

# What we accept on POST /users
class UserCreate(BaseModel):
    username: str
    password: str
    email: EmailStr

# What we return — includes id, never a raw DB object
class UserResponse(BaseModel):
    uuid: str
    username: str
    email: str

    model_config = {"from_attributes": True}  # allows ORM -> schema conversion