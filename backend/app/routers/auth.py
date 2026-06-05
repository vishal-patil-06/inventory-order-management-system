from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.auth import (
    RegisterRequest,
    LoginRequest,
    OwnerLoginResponse
)

from app.services.auth_service import (
    register_owner,
    login_owner
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)


# Registration
@router.post(
    "/register",
    response_model=OwnerLoginResponse
)
def register(
    payload: RegisterRequest,
    db: Session = Depends(get_db)
):
    try:
        owner = register_owner(
            db,
            payload
        )

        return OwnerLoginResponse.from_owner(owner)

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        )

# Login
@router.post(
    "/login",
    response_model=OwnerLoginResponse
)
def login(
    payload: LoginRequest,
    db: Session = Depends(get_db)
):
    owner = login_owner(
        db,
        payload
    )

    if not owner:
        raise HTTPException(
            status_code=401,
            detail="Invalid credentials"
        )

    return OwnerLoginResponse.from_owner(owner)