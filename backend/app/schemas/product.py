from decimal import Decimal
from datetime import datetime
from typing import Optional

from pydantic import BaseModel
from pydantic import Field


class ProductCreate(BaseModel):
    name: str = Field(
        min_length=2,
        max_length=255
    )

    code: str = Field(
        min_length=1,
        max_length=100
    )

    description: Optional[str] = None

    price: Decimal = Field(
        gt=0
    )

    stock_quantity: int = Field(
        ge=0
    )

    low_stock_threshold: int = Field(
        ge=0
    )


class ProductUpdate(BaseModel):
    name: Optional[str] = None

    description: Optional[str] = None

    price: Optional[Decimal] = None

    stock_quantity: Optional[int] = None

    low_stock_threshold: Optional[int] = None


class ProductResponse(BaseModel):
    id: int

    owner_id: int

    name: str

    code: str

    description: Optional[str]

    price: Decimal

    stock_quantity: int

    low_stock_threshold: int

    created_at: datetime

    updated_at: datetime

    class Config:
        from_attributes = True


class ProductListResponse(BaseModel):
    data: list[ProductResponse]

    total: int

    page: int

    limit: int