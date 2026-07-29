from typing import Any, Dict
from app.agents.base import BaseAgent

class ManufacturingPlannerAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="manufacturing",
            name="Manufacturing Planner Agent",
            description="Designs routing operations, CNC program setups, assembly step sequences, and factory throughput."
        )

    async def execute(self, project_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        design = context.get("design", {})
        cost = context.get("cost", {})
        prompt = f"""
You are the Manufacturing Planner Agent for ForgeMind X.
Generate factory routing workflow, assembly procedure, and tooling schedule for:

PRODUCT: {project_data.get('title')}
PRIMARY PROCESS: {design.get('manufacturing_process', '5-Axis CNC')}

Return a JSON object containing:
- "manufacturing_workflow": list of sequential operational step strings
- "assembly_steps": list of assembly procedure step strings
- "production_estimate": object with "setup_time_hours", "cycle_time_per_unit_hours", "batch_size", "total_lead_time_days"
- "machine_recommendations": list of machinery / equipment strings
"""
        messages = [
            {"role": "system", "content": "You are a Chief Manufacturing Operations Planner. Output valid JSON."},
            {"role": "user", "content": prompt}
        ]
        result = await self.client.generate_json(messages)
        if "manufacturing_workflow" not in result:
            result = {
                "manufacturing_workflow": ["Step 1: Billets stock cutting", "Step 2: 5-Axis CNC Rough & Finish Milling", "Step 3: Anodizing surface treatment", "Step 4: Quality Inspection"],
                "assembly_steps": ["Align sub-assembly frame", "Fasten M3 screws to 2.5 Nm torque", "Perform final leak & vibration check"],
                "production_estimate": {"setup_time_hours": 3.0, "cycle_time_per_unit_hours": 1.5, "batch_size": 100, "total_lead_time_days": 10},
                "machine_recommendations": ["Haas UMC-750 5-Axis CNC", "Mitutoyo CMM Inspection System"]
            }
        return result
