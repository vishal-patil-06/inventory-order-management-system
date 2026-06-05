from datetime import datetime

from sqlalchemy.orm import Session

from app.models.product import Product

# Create Product
def create_product(
    db: Session,
    owner_id: int,
    payload
):
    existing_product = (
        db.query(Product)
        .filter(
            Product.owner_id == owner_id,
            Product.code == payload.code,
            Product.is_deleted == False
        )
        .first()
    )

    if existing_product:
        raise ValueError(
            "Product code already exists"
        )

    product = Product(
        owner_id=owner_id,
        **payload.model_dump()
    )

    db.add(product)

    db.commit()

    db.refresh(product)

    return product

# Get products
def get_products(
    db: Session,
    owner_id: int,
    page: int,
    limit: int,
    search: str | None
):
    query = (
        db.query(Product)
        .filter(
            Product.owner_id == owner_id,
            Product.is_deleted == False
        )
    )

    if search:
        query = query.filter(
            Product.name.ilike(
                f"%{search}%"
            )
        )

    total = query.count()

    products = (
        query
        .offset(
            (page - 1) * limit
        )
        .limit(limit)
        .all()
    )

    return {
        "data": products,
        "total": total,
        "page": page,
        "limit": limit
    }

# Get product by ID
def get_product_by_id(
    db: Session,
    owner_id: int,
    product_id: int
):
    return (
        db.query(Product)
        .filter(
            Product.id == product_id,
            Product.owner_id == owner_id,
            Product.is_deleted == False
        )
        .first()
    )

# Update product
def update_product(
    db: Session,
    product,
    payload
):
    for key, value in payload.model_dump(
        exclude_unset=True
    ).items():
        setattr(
            product,
            key,
            value
        )

    db.commit()

    db.refresh(product)

    return product

# Soft delete product
def delete_product(
    db: Session,
    product
):
    product.is_deleted = True

    product.deleted_at = datetime.utcnow()

    db.commit()

