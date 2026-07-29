import asyncio
import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, BackgroundTasks, Depends, HTTPException, status
from app.core.database import get_executions_collection, get_projects_collection
from app.api.auth import get_current_user
from app.models.user import UserResponse
from app.models.execution import ExecutionCreate, ExecutionResponse, AgentProgress
from app.services.agent_runner import pipeline_runner

router = APIRouter(prefix="/executions", tags=["Executions"])

@router.post("", response_model=ExecutionResponse, status_code=status.HTTP_201_CREATED)
async def create_execution(
    execution_in: ExecutionCreate,
    background_tasks: BackgroundTasks,
    current_user: UserResponse = Depends(get_current_user)
):
    projects_col = get_projects_collection()
    executions_col = get_executions_collection()
    
    project = await projects_col.find_one({"id": execution_in.project_id, "user_id": current_user.id})
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")

    execution_id = str(uuid.uuid4())
    now = datetime.utcnow()

    initial_statuses = [
        AgentProgress(agent_id="requirements", name="Requirements Analysis Agent", status="pending"),
        AgentProgress(agent_id="design", name="Product Design Agent", status="pending"),
        AgentProgress(agent_id="simulation", name="Engineering Simulation Agent", status="pending"),
        AgentProgress(agent_id="cost", name="Cost & Procurement Agent", status="pending"),
        AgentProgress(agent_id="manufacturing", name="Manufacturing Planner Agent", status="pending"),
        AgentProgress(agent_id="report", name="Report Generator Agent", status="pending"),
    ]

    execution_doc = {
        "id": execution_id,
        "project_id": execution_in.project_id,
        "user_id": current_user.id,
        "status": "queued",
        "current_agent": None,
        "progress_percentage": 0,
        "agent_statuses": [a.dict() for a in initial_statuses],
        "logs": [f"[{now.strftime('%H:%M:%S')}] Execution pipeline initialized for project '{project.get('title')}'."],
        "report_id": None,
        "created_at": now,
        "completed_at": None,
        "error_message": None
    }
    await executions_col.insert_one(execution_doc)

    # Increment project execution count
    await projects_col.update_one(
        {"id": execution_in.project_id},
        {"$inc": {"execution_count": 1}, "$set": {"status": "queued", "updated_at": now}}
    )

    # Trigger background pipeline execution
    background_tasks.add_task(
        pipeline_runner.run_pipeline,
        execution_id=execution_id,
        project_id=execution_in.project_id,
        user_id=current_user.id
    )

    return ExecutionResponse(**execution_doc)

@router.get("", response_model=List[ExecutionResponse])
async def list_executions(
    project_id: Optional[str] = None,
    current_user: UserResponse = Depends(get_current_user)
):
    executions_col = get_executions_collection()
    query = {"user_id": current_user.id}
    if project_id:
        query["project_id"] = project_id
        
    cursor = executions_col.find(query)
    items = await cursor.to_list(length=100)
    items.sort(key=lambda x: x.get("created_at", datetime.min), reverse=True)
    return [ExecutionResponse(**item) for item in items]

@router.get("/{execution_id}", response_model=ExecutionResponse)
async def get_execution(
    execution_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    executions_col = get_executions_collection()
    doc = await executions_col.find_one({"id": execution_id, "user_id": current_user.id})
    if not doc:
        raise HTTPException(status_code=404, detail="Execution not found")
    return ExecutionResponse(**doc)
