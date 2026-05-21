from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Forum TPSIT API",
    version="1.0.0",
    description="Forum TPSIT API with JWT Authentication",
    docs_url="/api/docs",
    openapi_url="/api/openapi.json"
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/test/test")
async def root():
    return {
        "message": "Benvenuto nell'API Forum TPSIT"
    }

