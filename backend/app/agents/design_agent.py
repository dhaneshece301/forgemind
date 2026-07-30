from typing import Any, Dict
from app.agents.base import BaseAgent

class ProductDesignAgent(BaseAgent):
    def __init__(self):
        super().__init__(
            agent_id="design",
            name="Product Design Agent",
            description="Formulates detailed mechanical dimensions, material selections, electronic components, and PCB specs."
        )

    async def execute(self, project_data: Dict[str, Any], context: Dict[str, Any]) -> Dict[str, Any]:
        req_output = context.get("requirements", {})
        prompt = f"""
You are the Product Design Agent for ForgeMind X.
Based on the project parameters and requirements analysis, synthesize product design specs and electronic component selection.

PRODUCT TITLE: {project_data.get('title')}
REQUIREMENTS: {req_output.get('requirements', [])}
ELECTRONIC REQUIREMENTS: {req_output.get('electronic_requirements', [])}

Return a JSON object containing:
- "geometry_type": string specifying the base primitive ("box", "cylinder", "sphere", "plate")
- "dimensions": object with length_mm, width_mm, height_mm, wall_thickness_mm, total_volume_cm3, and radius_mm
- "material_recommendations": list of objects with "material", "reasoning", "density_g_cm3"
- "electronic_components": list of objects with "component", "category", "package", "qty", "function"
- "pcb_specifications": object with "layers", "board_dimensions", "substrate", "copper_weight", "surface_finish"
- "manufacturing_process": string primary process (e.g. 5-Axis CNC Milling & SMT PCB Assembly)
- "cad_specifications": key CAD parameters and tolerance specs
"""
        messages = [
            {"role": "system", "content": "You are a Chief Hardware & Electronics Design Engineer. Output valid JSON."},
            {"role": "user", "content": prompt}
        ]
        result = await self.client.generate_json(messages)
        if "dimensions" not in result or "electronic_components" not in result:
            result = {
                "geometry_type": "box",
                "dimensions": {
                    "length_mm": 120.0,
                    "width_mm": 80.0,
                    "height_mm": 35.0,
                    "wall_thickness_mm": 2.5,
                    "total_volume_cm3": 336.0,
                    "radius_mm": 0.0
                },
                "material_recommendations": [
                    {"material": "Aluminum 6061-T6 / Anodized FR4 Enclosure", "reasoning": "High thermal dissipation and EMI shielding", "density_g_cm3": 2.70}
                ],
                "electronic_components": [
                    {"component": "ESP32-S3-WROOM-1 MCU", "category": "Microcontroller", "package": "QFN-56", "qty": 1, "function": "Main System Controller & Wireless Gateway"},
                    {"component": "MPU-6050 Motion Sensor", "category": "Sensor IC", "package": "QFN-24", "qty": 1, "function": "6-Axis Gyroscope & Accelerometer"},
                    {"component": "TPS62130 Step-Down Regulator", "category": "Power IC", "package": "QFN-16", "qty": 1, "function": "High Efficiency 3.3V / 3A Power Converter"},
                    {"component": "MCP73831 LiPo Charger IC", "category": "Power IC", "package": "SOT-23-5", "qty": 1, "function": "Lithium Battery Charge Management"},
                    {"component": "USB-C 16-Pin Receptacle", "category": "Connector", "package": "SMD", "qty": 1, "function": "Power Input & USB Programming Port"},
                    {"component": "0805 SMD Passives Assortment", "category": "Passives", "package": "0805", "qty": 32, "function": "Decoupling Capacitors & Pull-up Resistors"}
                ],
                "pcb_specifications": {
                    "layers": 4,
                    "board_dimensions": "100mm x 65mm",
                    "substrate": "FR4 High-TG 170°C",
                    "copper_weight": "1 oz (35um)",
                    "surface_finish": "ENIG (Electroless Nickel Immersion Gold)"
                },
                "manufacturing_process": "5-Axis High-Speed CNC Milling & SMT PCB Assembly",
                "cad_specifications": {"tolerance_class": "ISO 2768-m", "surface_finish": "Ra 1.6 um"}
            }
        return result
