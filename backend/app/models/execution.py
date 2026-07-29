from datetime import datetime
from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field

class AgentProgress(BaseModel):
    agent_id: str  # requirements, design, simulation, cost, manufacturing, report
    name: str
    status: str  # pending, in_progress, completed, failed
    started_at: Optional[datetime] = None
    completed_at: Optional[datetime] = None
    output_summary: Optional[str] = None

class ExecutionCreate(BaseModel):
    project_id: str
    override_model: Optional[str] = None

class ExecutionResponse(BaseModel):
    id: str
    project_id: str
    user_id: str
    status: str  # queued, running, completed, failed
    current_agent: Optional[str] = None
    progress_percentage: int = 0
    agent_statuses: List[AgentProgress] = []
    logs: List[str] = []
    report_id: Optional[str] = None
    created_at: datetime
    completed_at: Optional[datetime] = None
    error_message: Optional[str] = None
