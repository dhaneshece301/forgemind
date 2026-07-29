from typing import Any, Dict
from app.agents.base import BaseAgent

class ProductDesignAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="design",
            name="Product Design Agent",
            description="Formulates detailed mechanical dimensions, material selections, and geometry specs."
        )

    async def execute(self, project_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        req_output = context.get("requirements", {})
        prompt = f"""
You are the Product Design Agent for ForgeMind X.
Based on the project parameters and requirements analysis, synthesize product design specs.

PRODUCT TITLE: {project_data.get('title')}
REQUIREMENTS: {req_output.get('requirements', [])}
CONSTRAINTS: {req_output.get('constraints', [])}

Return a JSON object containing:
- "geometry_type": string specifying the base primitive ("box", "cylinder", "sphere", "plate")
- "dimensions": object with length_mm, width_mm, height_mm, wall_thickness_mm, total_volume_cm3, and radius_mm (if cylinder/sphere)
- "material_recommendations": list of objects with "material", "reasoning", "density_g_cm3"
- "manufacturing_process": string primary recommended process (e.g. 5-Axis CNC Milling, Additive DMLS, Injection Molding)
- "cad_specifications": key CAD parameters and tolerance specs
"""
        messages = [
            {"role": "system", "content": "You are a Chief Mechanical Design Engineer. Output valid JSON."},
            {"role": "user", "content": prompt}
        ]
        result = await self.client.generate_json(messages)
        if "dimensions" not in result:
            result = {
                "geometry_type": "box",
                "dimensions": {"length_mm": 420.0, "width_mm": 380.0, "height_mm": 150.0, "wall_thickness_mm": 3.0, "total_volume_cm3": 1250.0, "radius_mm": 0.0},
                "material_recommendations": [{"material": "Aluminum 7075-T6", "reasoning": "High strength aerospace alloy", "density_g_cm3": 2.81}],
                "manufacturing_process": "5-Axis High-Speed CNC Milling",
                "cad_specifications": {"tolerance_class": "ISO 2768-m", "surface_finish": "Ra 1.6 um"}
            }
        return result
