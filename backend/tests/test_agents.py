import pytest
from app.services.agent_runner import pipeline_runner

@pytest.mark.asyncio
async def test_full_6_agent_pipeline(async_client):
    # 1. Register & Auth
    reg = await async_client.post("/api/auth/register", json={
        "email": "agent_tester@forgemind.ai",
        "password": "Password123!",
        "full_name": "Autonomous Agent Tester"
    })
    user_id = reg.json()["user"]["id"]
    token = reg.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Create Project
    proj_payload = {
        "title": "Titanium Drone Chassis",
        "description": "Lightweight quadcopter arm frame with heat sink fins.",
        "category": "Robotics & Aviation",
        "target_budget": 25000.0,
        "target_timeline_weeks": 8
    }
    create_res = await async_client.post("/api/projects", json=proj_payload, headers=headers)
    proj_id = create_res.json()["id"]

    # 3. Create Execution
    exec_res = await async_client.post("/api/executions", json={"project_id": proj_id}, headers=headers)
    assert exec_res.status_code == 201
    exec_id = exec_res.json()["id"]

    # 4. Synchronously execute pipeline
    await pipeline_runner.run_pipeline(execution_id=exec_id, project_id=proj_id, user_id=user_id)

    # 5. Verify Execution result
    check_exec = await async_client.get(f"/api/executions/{exec_id}", headers=headers)
    assert check_exec.status_code == 200
    exec_data = check_exec.json()
    assert exec_data["status"] == "completed"
    assert exec_data["progress_percentage"] == 100
    assert exec_data["report_id"] is not None

    # 6. Verify Report retrieval
    report_id = exec_data["report_id"]
    rep_res = await async_client.get(f"/api/reports/{report_id}", headers=headers)
    assert rep_res.status_code == 200
    rep_data = rep_res.json()
    assert "executive_summary" in rep_data
    assert "markdown_report" in rep_data
