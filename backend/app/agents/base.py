import logging
from abc import ABC, abstractmethod
from typing import Any, Dict
from app.services.nvidia_client import nvidia_client

logger = logging.getLogger("forgemind.agents")

class BaseAgent(ABC):
    def __init__(self, agent_id: str, name: str, description: str):
        self.agent_id = agent_id
        self.name = name
        self.description = description
        self.client = nvidia_client

    @abstractmethod
    async def execute(self, project_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        """Execute the agent task given project details and prior agent outputs."""
        pass
