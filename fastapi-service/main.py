from fastapi import FastAPI
from authenticator import authenticator
from routers import accounts, categories, items
from fastapi.middleware.cors import CORSMiddleware
import os



app = FastAPI()
app.include_router(items.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)
app.include_router(categories.router)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        os.environ.get(
            "CORS_HOST",
            "http://localhost:3000"
        )
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
