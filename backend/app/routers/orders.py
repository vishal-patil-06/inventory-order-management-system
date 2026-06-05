from fastapi import APIRouter
from fastapi import Depends
from fastapi import Header
from fastapi import HTTPException
from fastapi import Query

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.models.order_item import OrderItem

from app.schemas.order import (
    OrderCreate,
    OrderListResponse,
    OrderResponse
)

from app.services.order_service import (
    create_order,
    get_orders,
    get_order_by_id,
    delete_order
)

router = APIRouter(
    prefix="/orders",
    tags=["Orders"]
)

# Create order
@router.post("")
def create_order_api(
    payload: OrderCreate,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    try:
        order = create_order(
            db,
            x_owner_id,
            payload
        )

        return {
            "id": order.id,
            "order_number": order.order_number,
            "customer_id": order.customer_id,
            "total_amount": float(order.total_amount),
            "status": order.status,
            "notes": order.notes,
            "created_at": order.created_at
        }

    except ValueError as error:
        raise HTTPException(
            status_code=400,
            detail=str(error)
        )
    

# List orders
@router.get("")
def get_orders_api(
    page: int = Query(
        default=1,
        ge=1
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    return get_orders(
        db,
        x_owner_id,
        page,
        limit
    )



# Get order by id
@router.get("/{order_id}")
def get_order_api(
    order_id: int,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    order = get_order_by_id(
        db,
        x_owner_id,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    order_items = (
        db.query(OrderItem)
        .filter(
            OrderItem.order_id == order.id
        )
        .all()
    )

    return {
        "id": order.id,
        "order_number": order.order_number,
        "customer_id": order.customer_id,
        "total_amount": float(order.total_amount),
        "status": order.status,
        "notes": order.notes,
        "created_at": order.created_at,
        "items": [
            {
                "product_id": item.product_id,
                "quantity": item.quantity,
                "unit_price": float(item.unit_price),
                "line_total": float(item.line_total)
            }
            for item in order_items
        ]
    }



# Delete order
@router.delete("/{order_id}")
def delete_order_api(
    order_id: int,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    order = get_order_by_id(
        db,
        x_owner_id,
        order_id
    )

    if not order:
        raise HTTPException(
            status_code=404,
            detail="Order not found"
        )

    delete_order(
        db,
        order
    )

    return {
        "message": "Order deleted successfully"
    }