from pydantic import BaseModel
from pydantic import Field

from decimal import Decimal
from datetime import datetime

class OrderItemCreate(BaseModel):
    product_id: int

    quantity: int = Field(
        gt=0
    )


class OrderCreate(BaseModel):
    customer_id: int

    notes: str | None = None

    items: list[OrderItemCreate]


class OrderItemResponse(BaseModel):
    product_id: int

    quantity: int

    unit_price: Decimal

    line_total: Decimal

    class Config:
        from_attributes = True


class OrderResponse(BaseModel):
    id: int

    order_number: str

    customer_id: int

    total_amount: Decimal

    status: str

    notes: str | None

    created_at: datetime

    items: list[OrderItemResponse]

    class Config:
        from_attributes = True



class OrderListItemResponse(BaseModel):
    id: int

    order_number: str

    customer_id: int

    total_amount: Decimal

    status: str

    created_at: datetime

    class Config:
        from_attributes = True


class OrderListResponse(BaseModel):
    data: list[OrderListItemResponse]

    total: int

    page: int

    limit: int