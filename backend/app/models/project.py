from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class ProjectCreate(BaseModel):
    title: str = Field(..., min_length=3, max_length=150)
    description: str = Field(..., min_length=10)
    category: str = Field(default="Aerospace & Robotics")
    target_budget: Optional[float] = Field(default=50000.0)
    target_timeline_weeks: Optional[int] = Field(default=12)

class ProjectUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    category: Optional[str] = None
    target_budget: Optional[float] = None
    target_timeline_weeks: Optional[int] = None
    status: Optional[str] = None

class ProjectResponse(BaseModel):
    id: str
    user_id: str
    title: str
    description: str
    category: str
    target_budget: float
    target_timeline_weeks: int
    status: str  # draft, queued, executing, completed, failed
    created_at: datetime
    updated_at: datetime
    execution_count: int = 0
    last_execution_id: Optional[str] = None
