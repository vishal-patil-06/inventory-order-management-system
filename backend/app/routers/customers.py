from fastapi import APIRouter
from fastapi import Depends
from fastapi import Header
from fastapi import HTTPException
from fastapi import Query

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.customer import (
    CustomerCreate,
    CustomerUpdate,
    CustomerResponse,
    CustomerListResponse
)

from app.services.customer_service import (
    create_customer,
    get_customers,
    get_customer_by_id,
    update_customer,
    delete_customer
)

router = APIRouter(
    prefix="/customers",
    tags=["Customers"]
)



# Create customer
@router.post(
    "",
    response_model=CustomerResponse
)
def create_customer_api(
    payload: CustomerCreate,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    try:
        return create_customer(
            db,
            x_owner_id,
            payload
        )

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        )
    


# Customer list
@router.get(
    "",
    response_model=CustomerListResponse
)
def get_customers_api(
    page: int = Query(
        default=1,
        ge=1
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),
    search: str | None = None,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    return get_customers(
        db,
        x_owner_id,
        page,
        limit,
        search
    )


# Get customer by ID
@router.get(
    "",
    response_model=CustomerListResponse
)
def get_customers_api(
    page: int = Query(
        default=1,
        ge=1
    ),
    limit: int = Query(
        default=10,
        ge=1,
        le=100
    ),
    search: str | None = None,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    return get_customers(
        db,
        x_owner_id,
        page,
        limit,
        search
    )


# Update customer
@router.put(
    "/{customer_id}",
    response_model=CustomerResponse
)
def update_customer_api(
    customer_id: int,
    payload: CustomerUpdate,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    customer = get_customer_by_id(
        db,
        x_owner_id,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    return update_customer(
        db,
        customer,
        payload
    )



# Delete customer
@router.delete(
    "/{customer_id}"
)
def delete_customer_api(
    customer_id: int,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    customer = get_customer_by_id(
        db,
        x_owner_id,
        customer_id
    )

    if not customer:
        raise HTTPException(
            status_code=404,
            detail="Customer not found"
        )

    delete_customer(
        db,
        customer
    )

    return {
        "message": "Customer deleted successfully"
    }

