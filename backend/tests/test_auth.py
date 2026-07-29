import pytest

@pytest.mark.asyncio
async def test_register_and_login(async_client):
    register_payload = {
        "email": "engineer@forgemind.ai",
        "password": "SecurePassword123!",
        "full_name": "Senior Test Engineer"
    }
    # Register
    res = await async_client.post("/api/auth/register", json=register_payload)
    assert res.status_code == 201
    data = res.json()
    assert "access_token" in data
    token = data["access_token"]
    assert data["user"]["email"] == "engineer@forgemind.ai"

    # Login
    login_payload = {
        "email": "engineer@forgemind.ai",
        "password": "SecurePassword123!"
    }
    login_res = await async_client.post("/api/auth/login", json=login_payload)
    assert login_res.status_code == 200
    login_data = login_res.json()
    assert "access_token" in login_data

    # Me Endpoint
    headers = {"Authorization": f"Bearer {token}"}
    me_res = await async_client.get("/api/auth/me", headers=headers)
    assert me_res.status_code == 200
    assert me_res.json()["full_name"] == "Senior Test Engineer"
