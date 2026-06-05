from fastapi import APIRouter
from fastapi import Depends
from fastapi import Header

from sqlalchemy.orm import Session

from app.core.database import get_db

from app.schemas.dashboard import (
    DashboardSummaryResponse
)

from app.services.dashboard_service import (
    get_dashboard_summary
)

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


# Summary API
@router.get(
    "/summary",
    response_model=DashboardSummaryResponse
)
def dashboard_summary_api(
    x_owner_id: int = Header(...),
    db: Session = Depends(get_db)
):
    return get_dashboard_summary(
        db,
        x_owner_id
    )


