from fastapi import APIRouter
from fastapi import Depends
from fastapi import Header
from fastapi import HTTPException
from fastapi import Query

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.product import (
    ProductCreate,
    ProductUpdate,
    ProductResponse,
    ProductListResponse
)

from app.services.product_service import (
    create_product,
    get_products,
    get_product_by_id,
    update_product,
    delete_product
)

router = APIRouter(
    prefix="/products",
    tags=["Products"]
)


# Create Product
@router.post(
    "",
    response_model=ProductResponse
)
def create_product_api(
    payload: ProductCreate,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    try:
        return create_product(
            db,
            x_owner_id,
            payload
        )

    except ValueError as error:
        raise HTTPException(
            status_code=409,
            detail=str(error)
        )
    

# List products
@router.get(
    "",
    response_model=ProductListResponse
)
def get_products_api(
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
    return get_products(
        db,
        x_owner_id,
        page,
        limit,
        search
    )

# Get product by ID
@router.get(
    "/{product_id}",
    response_model=ProductResponse
)
def get_product_api(
    product_id: int,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    product = get_product_by_id(
        db,
        x_owner_id,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return product



# Update product
@router.put(
    "/{product_id}",
    response_model=ProductResponse
)
def update_product_api(
    product_id: int,
    payload: ProductUpdate,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    product = get_product_by_id(
        db,
        x_owner_id,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    return update_product(
        db,
        product,
        payload
    )

# Delete product
@router.delete(
    "/{product_id}"
)
def delete_product_api(
    product_id: int,
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    product = get_product_by_id(
        db,
        x_owner_id,
        product_id
    )

    if not product:
        raise HTTPException(
            status_code=404,
            detail="Product not found"
        )

    delete_product(
        db,
        product
    )

    return {
        "message": "Product deleted successfully"
    }

