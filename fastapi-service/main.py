from fastapi import FastAPI
from routers import items
from authenticator import authenticator


app = FastAPI()
app.include_router(items.router)
app.include_router(authenticator.router)

