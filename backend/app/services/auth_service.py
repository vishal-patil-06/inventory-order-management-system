from sqlalchemy.orm import Session

from app.models.owner import Owner

from app.utils.password import (
    hash_password,
    verify_password
)


# Registration
def register_owner(
    db: Session,
    payload
):
    existing_owner = (
        db.query(Owner)
        .filter(
            Owner.email == payload.email,
            Owner.is_deleted == False
        )
        .first()
    )

    if existing_owner:
        raise ValueError(
            "Email already registered"
        )

    owner = Owner(
        full_name=payload.full_name,
        email=payload.email,
        password_hash=hash_password(
            payload.password
        )
    )

    db.add(owner)

    db.commit()

    db.refresh(owner)

    return owner


# Login
def login_owner(
    db: Session,
    payload
):
    owner = (
        db.query(Owner)
        .filter(
            Owner.email == payload.email,
            Owner.is_deleted == False
        )
        .first()
    )

    if not owner:
        return None

    is_valid = verify_password(
        payload.password,
        owner.password_hash
    )

    if not is_valid:
        return None

    return owner