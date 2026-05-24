from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlmodel import SQLModel
from app.database import engine
from app.models.user_model import User
from app.models.topic_model import Topic
from app.routers import user_router, auth_router, topic_router, post_router, comment_router, like_post_router, like_comment_router

SQLModel.metadata.create_all(engine)  # no bind= keyword here

app = FastAPI(title="My API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth_router.router)
app.include_router(user_router.router)
app.include_router(topic_router.router)
app.include_router(post_router.router)
app.include_router(comment_router.router)
app.include_router(like_post_router.router)
app.include_router(like_comment_router.router)

@app.get("/test")
async def root():
    return {"message": "Benvenuto nell'API del nostro forum"}
