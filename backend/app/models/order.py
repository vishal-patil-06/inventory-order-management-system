from datetime import datetime

from sqlalchemy import BigInteger
from sqlalchemy import Boolean
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Numeric
from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy.orm import relationship

from app.models.base import Base

items = relationship(
    "OrderItem",
    back_populates="order"
)


class Order(Base):
    __tablename__ = "orders"

    id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    owner_id = Column(
        BigInteger,
        ForeignKey("owners.id"),
        nullable=False
    )

    customer_id = Column(
        BigInteger,
        ForeignKey("customers.id"),
        nullable=False
    )

    order_number = Column(
        String(50),
        unique=True,
        nullable=False
    )

    total_amount = Column(
        Numeric(12, 2),
        nullable=False
    )

    status = Column(
        String(30),
        nullable=False
    )

    notes = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )

    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
        nullable=False
    )

    is_deleted = Column(
        Boolean,
        default=False,
        nullable=False
    )

    deleted_at = Column(
        DateTime,
        nullable=True
    )