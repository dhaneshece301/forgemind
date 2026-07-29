import asyncio
import logging
from typing import Any, Dict, List, Optional
from motor.motor_asyncio import AsyncIOMotorClient
from app.core.config import settings

logger = logging.getLogger("forgemind.database")

class InMemoryCollection:
    """In-memory fallback collection replicating Motor collection interface for resilient local testing."""
    def __init__(self, name: str):
        self.name = name
        self._data: Dict[str, Dict[str, Any]] = {}

    async def insert_one(self, document: Dict[str, Any]):
        doc_id = str(document.get("_id") or document.get("id"))
        self._data[doc_id] = document
        class Result:
            inserted_id = doc_id
        return Result()

    async def find_one(self, filter_dict: Dict[str, Any]) -> Optional[Dict[str, Any]]:
        for item in self._data.values():
            match = True
            for k, v in filter_dict.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                return item.copy()
        return None

    def find(self, filter_dict: Optional[Dict[str, Any]] = None):
        filter_dict = filter_dict or {}
        matched = []
        for item in self._data.values():
            match = True
            for k, v in filter_dict.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                matched.append(item.copy())
        
        class Cursor:
            def __init__(self, items):
                self.items = items
            def sort(self, key, direction=-1):
                self.items.sort(key=lambda x: x.get(key, 0), reverse=(direction == -1))
                return self
            def limit(self, n):
                self.items = self.items[:n]
                return self
            async def to_list(self, length: Optional[int] = None):
                if length is not None:
                    return self.items[:length]
                return self.items
        return Cursor(matched)

    async def update_one(self, filter_dict: Dict[str, Any], update_dict: Dict[str, Any]):
        doc = await self.find_one(filter_dict)
        if doc:
            doc_id = str(doc.get("_id") or doc.get("id"))
            if "$set" in update_dict:
                for k, v in update_dict["$set"].items():
                    self._data[doc_id][k] = v
            if "$push" in update_dict:
                for k, v in update_dict["$push"].items():
                    if k not in self._data[doc_id]:
                        self._data[doc_id][k] = []
                    self._data[doc_id][k].append(v)
            class Result:
                modified_count = 1
            return Result()
        class Result:
            modified_count = 0
        return Result()

    async def delete_one(self, filter_dict: Dict[str, Any]):
        doc = await self.find_one(filter_dict)
        if doc:
            doc_id = str(doc.get("_id") or doc.get("id"))
            if doc_id in self._data:
                del self._data[doc_id]
                class Result:
                    deleted_count = 1
                return Result()
        class Result:
            deleted_count = 0
        return Result()

    async def count_documents(self, filter_dict: Dict[str, Any]) -> int:
        count = 0
        for item in self._data.values():
            match = True
            for k, v in filter_dict.items():
                if item.get(k) != v:
                    match = False
                    break
            if match:
                count += 1
        return count


class InMemoryDB:
    def __init__(self):
        self.collections: Dict[str, InMemoryCollection] = {}

    def get_collection(self, name: str) -> InMemoryCollection:
        if name not in self.collections:
            self.collections[name] = InMemoryCollection(name)
        return self.collections[name]

    def __getitem__(self, name: str) -> InMemoryCollection:
        return self.get_collection(name)


class DatabaseManager:
    def __init__(self):
        self.client: Optional[AsyncIOMotorClient] = None
        self.db = None
        self.is_connected = False
        self.fallback_db = InMemoryDB()

    async def connect(self):
        try:
            self.client = AsyncIOMotorClient(settings.MONGODB_URI, serverSelectionTimeoutMS=2000)
            await self.client.admin.command('ping')
            self.db = self.client[settings.MONGODB_DATABASE]
            self.is_connected = True
            logger.info("Successfully connected to MongoDB Atlas / Server.")
        except Exception as e:
            logger.warning(f"MongoDB connection unavailable ({e}). Fallback to resilient in-memory database engine.")
            self.db = self.fallback_db
            self.is_connected = False

    async def disconnect(self):
        if self.client:
            self.client.close()
            logger.info("Disconnected from MongoDB.")

    def get_collection(self, name: str):
        if self.db is None:
            return self.fallback_db.get_collection(name)
        return self.db[name]

db_manager = DatabaseManager()

def get_users_collection():
    return db_manager.get_collection("users")

def get_projects_collection():
    return db_manager.get_collection("projects")

def get_executions_collection():
    return db_manager.get_collection("executions")

def get_reports_collection():
    return db_manager.get_collection("reports")

def get_agent_outputs_collection():
    return db_manager.get_collection("agent_outputs")
