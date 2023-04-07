from fastapi import FastAPI
from routers import items
from authenticator import authenticator
from routers import accounts


app = FastAPI()
app.include_router(items.router)
app.include_router(authenticator.router)
app.include_router(accounts.router)

