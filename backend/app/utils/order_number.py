from datetime import datetime


def generate_order_number():
    return (
        f"ORD-"
        f"{datetime.now().strftime('%Y%m%d%H%M%S')}"
    )