from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import EmailStr
from pydantic import Field


class CustomerCreate(BaseModel):
    full_name: str = Field(
        min_length=2,
        max_length=255
    )

    email: EmailStr

    phone: Optional[str] = Field(
        default=None,
        max_length=20
    )


class CustomerUpdate(BaseModel):
    full_name: Optional[str] = None

    email: Optional[EmailStr] = None

    phone: Optional[str] = None


class CustomerResponse(BaseModel):
    id: int

    owner_id: int

    full_name: str

    email: str

    phone: Optional[str]

    created_at: datetime

    updated_at: datetime

    class Config:
        from_attributes = True


class CustomerListResponse(BaseModel):
    data: list[CustomerResponse]

    total: int

    page: int

    limit: int