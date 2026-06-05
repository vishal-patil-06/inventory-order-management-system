from datetime import datetime

from sqlalchemy.orm import Session

from app.models.customer import Customer
from app.models.order import Order
from app.models.order_item import OrderItem
from app.models.product import Product

from app.utils.order_number import (
    generate_order_number
)


# Create order
def create_order(
    db: Session,
    owner_id: int,
    payload
):
    customer = (
        db.query(Customer)
        .filter(
            Customer.id == payload.customer_id,
            Customer.owner_id == owner_id,
            Customer.is_deleted == False
        )
        .first()
    )

    if not customer:
        raise ValueError(
            "Customer not found"
        )

    order = Order(
        owner_id=owner_id,
        customer_id=payload.customer_id,
        order_number=generate_order_number(),
        total_amount=0,
        status="CREATED",
        notes=payload.notes
    )

    db.add(order)

    db.flush()

    total_amount = 0

    for item in payload.items:

        product = (
            db.query(Product)
            .filter(
                Product.id == item.product_id,
                Product.owner_id == owner_id,
                Product.is_deleted == False
            )
            .first()
        )

        if not product:
            raise ValueError(
                f"Product {item.product_id} not found"
            )

        if product.stock_quantity < item.quantity:
            raise ValueError(
                f"Insufficient stock for {product.name}"
            )

        unit_price = product.price

        line_total = (
            unit_price * item.quantity
        )

        order_item = OrderItem(
            order_id=order.id,
            product_id=product.id,
            quantity=item.quantity,
            unit_price=unit_price,
            line_total=line_total
        )

        db.add(order_item)

        product.stock_quantity -= item.quantity

        total_amount += line_total

    order.total_amount = total_amount

    db.commit()

    db.refresh(order)

    return order


# Get orders
def get_orders(
    db: Session,
    owner_id: int,
    page: int,
    limit: int
):
    query = (
        db.query(Order)
        .filter(
            Order.owner_id == owner_id,
            Order.is_deleted == False
        )
        .order_by(Order.created_at.desc())
    )

    total = query.count()

    orders = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "data": [
            {
                "id": order.id,
                "order_number": order.order_number,
                "customer_id": order.customer_id,
                "total_amount": float(order.total_amount),
                "status": order.status,
                "notes": order.notes,
                "created_at": order.created_at
            }
            for order in orders
        ],
        "total": total,
        "page": page,
        "limit": limit
    }


# Get order by id
def get_order_by_id(
    db: Session,
    owner_id: int,
    order_id: int
):
    return (
        db.query(Order)
        .filter(
            Order.id == order_id,
            Order.owner_id == owner_id,
            Order.is_deleted == False
        )
        .first()
    )


# Delete order
def delete_order(
    db: Session,
    order
):
    order.is_deleted = True

    order.deleted_at = datetime.utcnow()

    db.commit()