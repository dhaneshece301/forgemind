import uuid
from datetime import datetime
from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, Query, status
from app.core.database import get_projects_collection, get_executions_collection
from app.api.auth import get_current_user
from app.models.user import UserResponse
from app.models.project import ProjectCreate, ProjectUpdate, ProjectResponse

router = APIRouter(prefix="/projects", tags=["Projects"])

@router.post("", response_model=ProjectResponse, status_code=status.HTTP_201_CREATED)
async def create_project(
    project_in: ProjectCreate,
    current_user: UserResponse = Depends(get_current_user)
):
    projects_col = get_projects_collection()
    project_id = str(uuid.uuid4())
    now = datetime.utcnow()
    
    doc = {
        "id": project_id,
        "user_id": current_user.id,
        "title": project_in.title,
        "description": project_in.description,
        "category": project_in.category,
        "target_budget": project_in.target_budget or 50000.0,
        "target_timeline_weeks": project_in.target_timeline_weeks or 12,
        "status": "draft",
        "created_at": now,
        "updated_at": now,
        "execution_count": 0,
        "last_execution_id": None
    }
    await projects_col.insert_one(doc)
    return ProjectResponse(**doc)

@router.get("", response_model=List[ProjectResponse])
async def list_projects(
    search: Optional[str] = Query(None),
    status_filter: Optional[str] = Query(None),
    current_user: UserResponse = Depends(get_current_user)
):
    projects_col = get_projects_collection()
    query = {"user_id": current_user.id}
    if status_filter:
        query["status"] = status_filter
    
    cursor = projects_col.find(query)
    items = await cursor.to_list(length=100)
    
    if search:
        search_lower = search.lower()
        items = [i for i in items if search_lower in i.get("title", "").lower() or search_lower in i.get("description", "").lower()]

    items.sort(key=lambda x: x.get("updated_at", datetime.min), reverse=True)
    return [ProjectResponse(**item) for item in items]

@router.get("/{project_id}", response_model=ProjectResponse)
async def get_project(
    project_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    projects_col = get_projects_collection()
    doc = await projects_col.find_one({"id": project_id, "user_id": current_user.id})
    if not doc:
        raise HTTPException(status_code=404, detail="Project not found")
    return ProjectResponse(**doc)

@router.put("/{project_id}", response_model=ProjectResponse)
async def update_project(
    project_id: str,
    project_in: ProjectUpdate,
    current_user: UserResponse = Depends(get_current_user)
):
    projects_col = get_projects_collection()
    existing = await projects_col.find_one({"id": project_id, "user_id": current_user.id})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")

    update_fields = {k: v for k, v in project_in.dict(exclude_unset=True).items() if v is not None}
    update_fields["updated_at"] = datetime.utcnow()
    
    await projects_col.update_one({"id": project_id}, {"$set": update_fields})
    updated_doc = await projects_col.find_one({"id": project_id})
    return ProjectResponse(**updated_doc)

@router.delete("/{project_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_project(
    project_id: str,
    current_user: UserResponse = Depends(get_current_user)
):
    projects_col = get_projects_collection()
    existing = await projects_col.find_one({"id": project_id, "user_id": current_user.id})
    if not existing:
        raise HTTPException(status_code=404, detail="Project not found")
    
    await projects_col.delete_one({"id": project_id})
    return None
