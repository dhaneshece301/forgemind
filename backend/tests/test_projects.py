import pytest

@pytest.mark.asyncio
async def test_project_crud(async_client):
    # 1. Register & Auth
    reg = await async_client.post("/api/auth/register", json={
        "email": "pm@forgemind.ai",
        "password": "Password123!",
        "full_name": "Project Manager"
    })
    token = reg.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # 2. Create Project
    proj_payload = {
        "title": "Hyper-Speed Electric Turbine Chassis",
        "description": "High thermal conductivity nickel-alloy turbine casing for next-gen VTOL propulsion systems.",
        "category": "Aerospace Propulsion",
        "target_budget": 120000.0,
        "target_timeline_weeks": 16
    }
    create_res = await async_client.post("/api/projects", json=proj_payload, headers=headers)
    assert create_res.status_code == 201
    proj_id = create_res.json()["id"]

    # 3. Get Project
    get_res = await async_client.get(f"/api/projects/{proj_id}", headers=headers)
    assert get_res.status_code == 200
    assert get_res.json()["title"] == "Hyper-Speed Electric Turbine Chassis"

    # 4. List Projects
    list_res = await async_client.get("/api/projects", headers=headers)
    assert list_res.status_code == 200
    assert len(list_res.json()) >= 1

    # 5. Delete Project
    del_res = await async_client.delete(f"/api/projects/{proj_id}", headers=headers)
    assert del_res.status_code == 204
