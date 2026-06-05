from pydantic import BaseModel


class DashboardSummaryResponse(BaseModel):
    total_products: int

    total_customers: int

    total_orders: int

    low_stock_products: int

    total_inventory_value: float