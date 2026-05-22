from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database import Base, engine
from app.routers import user_router, auth_router, topic_router

# Creates tables if they don't exist (use Alembic for migrations in production)
Base.metadata.create_all(bind=engine)

app = FastAPI(title="Forum TPSIT API", version="0.1.0")

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

@app.get("/test")
async def root():
    return {"message": "Benvenuto nell'API del nostro forum"}
