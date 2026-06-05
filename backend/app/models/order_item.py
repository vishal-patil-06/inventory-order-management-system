from datetime import datetime

from sqlalchemy import BigInteger
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Numeric

from app.models.base import Base


class OrderItem(Base):
    __tablename__ = "order_items"

    id = Column(
        BigInteger,
        primary_key=True,
        index=True
    )

    order_id = Column(
        BigInteger,
        ForeignKey("orders.id"),
        nullable=False
    )

    product_id = Column(
        BigInteger,
        ForeignKey("products.id"),
        nullable=False
    )

    quantity = Column(
        Integer,
        nullable=False
    )

    unit_price = Column(
        Numeric(12, 2),
        nullable=False
    )

    line_total = Column(
        Numeric(12, 2),
        nullable=False
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow,
        nullable=False
    )