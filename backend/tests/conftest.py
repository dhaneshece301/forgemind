import pytest
import pytest_asyncio
from httpx import AsyncClient, ASGITransport
from app.main import app
from app.core.database import db_manager

@pytest_asyncio.fixture(autouse=True)
async def init_db():
    await db_manager.connect()
    # Drop collections to ensure clean state
    await db_manager.db.users.drop()
    await db_manager.db.projects.drop()
    await db_manager.db.reports.drop()
    yield
    await db_manager.disconnect()

@pytest_asyncio.fixture
async def async_client():
    async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as client:
        yield client
