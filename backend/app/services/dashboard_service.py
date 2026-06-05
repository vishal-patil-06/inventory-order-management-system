from sqlalchemy import func

from app.models.product import Product
from app.models.customer import Customer
from app.models.order import Order


# Dashboard summary service
def get_dashboard_summary(
    db,
    owner_id: int
):
    total_products = (
        db.query(Product)
        .filter(
            Product.owner_id == owner_id,
            Product.is_deleted == False
        )
        .count()
    )

    total_customers = (
        db.query(Customer)
        .filter(
            Customer.owner_id == owner_id,
            Customer.is_deleted == False
        )
        .count()
    )

    total_orders = (
        db.query(Order)
        .filter(
            Order.owner_id == owner_id,
            Order.is_deleted == False
        )
        .count()
    )

    low_stock_products = (
        db.query(Product)
        .filter(
            Product.owner_id == owner_id,
            Product.is_deleted == False,
            Product.stock_quantity
            <= Product.low_stock_threshold
        )
        .count()
    )

    inventory_value = (
        db.query(
            func.sum(
                Product.price
                * Product.stock_quantity
            )
        )
        .filter(
            Product.owner_id == owner_id,
            Product.is_deleted == False
        )
        .scalar()
    )

    return {
        "total_products": total_products,
        "total_customers": total_customers,
        "total_orders": total_orders,
        "low_stock_products": low_stock_products,
        "total_inventory_value": float(
            inventory_value or 0
        )
    }


