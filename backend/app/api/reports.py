from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException
from app.core.database import get_reports_collection
from app.api.auth import get_current_user
from app.models.user import UserResponse
from app.models.report import EngineeringReportResponse

router = APIRouter(prefix="/reports", tags=["Reports"])

@router.get("", response_model=List[EngineeringReportResponse])
async def list_reports(
    project_id: Optional[str] = None,
    current_user: UserResponse = Depends(get_current_user)
):
    reports_col = get_reports_collection()
    query = {"user_id": current_user.id}
    if project_id:
        query["project_id"] = project_id
    
    cursor = reports_col.find(query)
    items = await cursor.to_list(length=50)
    items.sort(key=lambda x: x.get("created_at"), reverse=True)
    return [EngineeringReportResponse(**item) for item in items]

@router.get("/{report_id}", response_model=EngineeringReportResponse)
async def get_report(
    report_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    reports_col = get_reports_collection()
    doc = await reports_col.find_one({"id": report_id, "user_id": current_user.id})
    if not doc:
        raise HTTPException(status_code=404, detail="Report not found")
    return EngineeringReportResponse(**doc)

@router.get("/{report_id}/export/markdown")
async def export_markdown(
    report_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    reports_col = get_reports_collection()
    doc = await reports_col.find_one({"id": report_id, "user_id": current_user.id})
    if not doc:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"filename": f"ForgeMind_Report_{report_id[:8]}.md", "content": doc.get("markdown_report", "")}

@router.get("/{report_id}/export/json")
async def export_json(
    report_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    reports_col = get_reports_collection()
    doc = await reports_col.find_one({"id": report_id, "user_id": current_user.id})
    if not doc:
        raise HTTPException(status_code=404, detail="Report not found")
    return {"filename": f"ForgeMind_Report_{report_id[:8]}.json", "content": doc.get("json_report", {})}

from fastapi.responses import Response
from app.services.pdf_generator import EngineeringReportPDF

@router.get("/{report_id}/export/pdf")
async def export_pdf(
    report_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    reports_col = get_reports_collection()
    doc = await reports_col.find_one({"id": report_id, "user_id": current_user.id})
    if not doc:
        raise HTTPException(status_code=404, detail="Report not found")
    
    generator = EngineeringReportPDF(doc)
    pdf_bytes = generator.generate()
    
    return Response(
        content=pdf_bytes,
        media_type="application/pdf",
        headers={
            "Content-Disposition": f"attachment; filename=ForgeMind_Report_{report_id[:8]}.pdf"
        }
    )
