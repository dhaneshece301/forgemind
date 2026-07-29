from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class EngineeringReportResponse(BaseModel):
    id: str
    execution_id: str
    project_id: str
    user_id: str
    title: str
    executive_summary: str
    requirements: Dict[str, Any]
    product_design: Dict[str, Any]
    engineering_simulation: Dict[str, Any]
    cost_and_procurement: Dict[str, Any]
    manufacturing_plan: Dict[str, Any]
    markdown_report: str
    json_report: Dict[str, Any]
    created_at: datetime
