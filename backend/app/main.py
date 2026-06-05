from fastapi import FastAPI
from sqlalchemy import text

from app.models import *
from app.core.database import Base
from app.core.database import engine

from app.routers.auth import (
    router as auth_router
)

from app.routers.products import (
    router as product_router
)

from app.routers.customers import (
    router as customer_router
)



Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Inventory Management API"
)

# Health check endpoints
@app.get("/")
def root():
    return {
        "message": "Inventory Management API"
    }


@app.get("/health/db")
def db_health():

    with engine.connect() as connection:
        connection.execute(text("SELECT 1"))

    return {
        "status": "connected"
    }


# adding routers
app.include_router(auth_router)
app.include_router(product_router)
app.include_router(customer_router)