from typing import Any, Dict
from app.agents.base import BaseAgent

class RequirementsAnalysisAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="requirements",
            name="Requirements Analysis Agent",
            description="Analyzes product idea to generate engineering requirements, constraints, and target KPIs."
        )

    async def execute(self, project_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        prompt = f"""
You are the Requirements Analysis Agent for ForgeMind X.
Analyze the following product concept and extract structured engineering requirements.

PRODUCT TITLE: {project_data.get('title')}
DESCRIPTION: {project_data.get('description')}
CATEGORY: {project_data.get('category', 'General Hardware')}
TARGET BUDGET: ₹{project_data.get('target_budget', 50000)}
TARGET TIMELINE: {project_data.get('target_timeline_weeks', 12)} weeks

Return a JSON object with:
- "requirements": list of strings (technical capabilities and functions)
- "constraints": list of strings (physical, budget, environmental limits)
- "objectives": list of strings (key design optimization goals)
"""
        messages = [
            {"role": "system", "content": "You are a Senior Systems Requirements Engineer. Output valid JSON."},
            {"role": "user", "content": prompt}
        ]
        result = await self.client.generate_json(messages)
        if "requirements" not in result:
            result = {
                "requirements": [f"Fulfill functional spec for {project_data.get('title')}", "High durability structural integrity", "Modular assembly"],
                "constraints": [f"Budget limit: ₹{project_data.get('target_budget', 50000)}", f"Timeline: {project_data.get('target_timeline_weeks', 12)} weeks"],
                "objectives": ["Maximize structural factor of safety", "Minimize unit production cost"]
            }
        return result
