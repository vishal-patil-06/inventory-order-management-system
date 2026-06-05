from datetime import datetime

from sqlalchemy.orm import Session

from app.models.customer import Customer

# Create Customer
def create_customer(
    db: Session,
    owner_id: int,
    payload
):
    existing_customer = (
        db.query(Customer)
        .filter(
            Customer.owner_id == owner_id,
            Customer.email == payload.email,
            Customer.is_deleted == False
        )
        .first()
    )

    if existing_customer:
        raise ValueError(
            "Customer email already exists"
        )

    customer = Customer(
        owner_id=owner_id,
        **payload.model_dump()
    )

    db.add(customer)

    db.commit()

    db.refresh(customer)

    return customer



# Get customers
def get_customers(
    db: Session,
    owner_id: int,
    page: int,
    limit: int,
    search: str | None
):
    query = (
        db.query(Customer)
        .filter(
            Customer.owner_id == owner_id,
            Customer.is_deleted == False
        )
    )

    if search:
        query = query.filter(
            Customer.full_name.ilike(
                f"%{search}%"
            )
        )

    total = query.count()

    customers = (
        query
        .offset((page - 1) * limit)
        .limit(limit)
        .all()
    )

    return {
        "data": customers,
        "total": total,
        "page": page,
        "limit": limit
    }


# Get customer by ID
def get_customer_by_id(
    db: Session,
    owner_id: int,
    customer_id: int
):
    return (
        db.query(Customer)
        .filter(
            Customer.id == customer_id,
            Customer.owner_id == owner_id,
            Customer.is_deleted == False
        )
        .first()
    )


# Update customer
def update_customer(
    db: Session,
    customer,
    payload
):
    for key, value in payload.model_dump(
        exclude_unset=True
    ).items():
        setattr(
            customer,
            key,
            value
        )

    db.commit()

    db.refresh(customer)

    return customer



# soft-delete customer
def delete_customer(
    db: Session,
    customer
):
    customer.is_deleted = True

    customer.deleted_at = datetime.utcnow()

    db.commit()