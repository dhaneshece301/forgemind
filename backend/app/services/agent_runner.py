import asyncio
import logging
import uuid
from datetime import datetime
from typing import Any, Dict, List
from app.core.database import (
    get_executions_collection,
    get_projects_collection,
    get_reports_collection,
    get_agent_outputs_collection
)
from app.agents.requirements_agent import RequirementsAnalysisAgent
from app.agents.design_agent import ProductDesignAgent
from app.agents.simulation_agent import EngineeringSimulationAgent
from app.agents.cost_agent import CostProcurementAgent
from app.agents.manufacturing_agent import ManufacturingPlannerAgent
from app.agents.report_agent import ReportGeneratorAgent

logger = logging.getLogger("forgemind.runner")

class AgentPipelineRunner:
    """Orchestrates 6 AI agents sequentially to generate manufacturing intelligence."""
    
    def __init__(self):
        self.agents = [
            RequirementsAnalysisAgent(),
            ProductDesignAgent(),
            EngineeringSimulationAgent(),
            CostProcurementAgent(),
            ManufacturingPlannerAgent(),
            ReportGeneratorAgent()
        ]

    async def run_pipeline(self, execution_id: str, project_id: str, user_id: str):
        executions_col = get_executions_collection()
        projects_col = get_projects_collection()
        reports_col = get_reports_collection()
        outputs_col = get_agent_outputs_collection()

        project = await projects_col.find_one({"id": project_id})
        if not project:
            logger.error(f"Project {project_id} not found for execution {execution_id}")
            await executions_col.update_one(
                {"id": execution_id},
                {"$set": {"status": "failed", "error_message": "Project record not found"}}
            )
            return

        logger.info(f"Starting 6-agent execution pipeline for execution {execution_id}")
        
        # Set execution status to running
        await executions_col.update_one(
            {"id": execution_id},
            {"$set": {"status": "running", "progress_percentage": 5}}
        )
        await projects_col.update_one(
            {"id": project_id},
            {"$set": {"status": "executing"}}
        )

        context: Dict[str, Any] = {}
        agent_statuses: List[Dict[str, Any]] = [
            {"agent_id": a.agent_id, "name": a.name, "status": "pending", "output_summary": None}
            for a in self.agents
        ]

        total_agents = len(self.agents)

        for idx, agent in enumerate(self.agents):
            agent_id = agent.agent_id
            start_time = datetime.utcnow()
            
            # Update current status
            agent_statuses[idx]["status"] = "in_progress"
            agent_statuses[idx]["started_at"] = start_time.isoformat()
            
            progress_pct = int(((idx) / total_agents) * 90) + 10
            
            log_msg = f"[Agent {idx+1}/6] Executing {agent.name}..."
            await executions_col.update_one(
                {"id": execution_id},
                {
                    "$set": {
                        "current_agent": agent_id,
                        "progress_percentage": progress_pct,
                        "agent_statuses": agent_statuses
                    },
                    "$push": {"logs": log_msg}
                }
            )

            try:
                # Execute agent
                agent_output = await agent.execute(project, context)
                context[agent_id] = agent_output
                
                # Store agent output artifact
                await outputs_col.insert_one({
                    "id": str(uuid.uuid4()),
                    "execution_id": execution_id,
                    "project_id": project_id,
                    "agent_id": agent_id,
                    "agent_name": agent.name,
                    "output": agent_output,
                    "created_at": datetime.utcnow()
                })

                end_time = datetime.utcnow()
                agent_statuses[idx]["status"] = "completed"
                agent_statuses[idx]["completed_at"] = end_time.isoformat()
                agent_statuses[idx]["output_summary"] = f"Successfully generated {agent_id} specifications."

                done_log = f"[Agent {idx+1}/6] Completed {agent.name} successfully."
                await executions_col.update_one(
                    {"id": execution_id},
                    {
                        "$set": {"agent_statuses": agent_statuses},
                        "$push": {"logs": done_log}
                    }
                )

            except Exception as e:
                logger.error(f"Error running agent {agent_id}: {e}", exc_info=True)
                agent_statuses[idx]["status"] = "failed"
                fail_log = f"[ERROR] {agent.name} failed: {str(e)}"
                await executions_col.update_one(
                    {"id": execution_id},
                    {
                        "$set": {
                            "status": "failed",
                            "agent_statuses": agent_statuses,
                            "error_message": str(e)
                        },
                        "$push": {"logs": fail_log}
                    }
                )
                await projects_col.update_one({"id": project_id}, {"$set": {"status": "failed"}})
                return

        # Generate final report object
        report_output = context.get("report", {})
        report_id = str(uuid.uuid4())
        
        report_doc = {
            "id": report_id,
            "execution_id": execution_id,
            "project_id": project_id,
            "user_id": user_id,
            "title": f"Engineering Report - {project.get('title')}",
            "executive_summary": report_output.get("executive_summary", "Completed full autonomous analysis."),
            "requirements": context.get("requirements", {}),
            "product_design": context.get("design", {}),
            "engineering_simulation": context.get("simulation", {}),
            "cost_and_procurement": context.get("cost", {}),
            "manufacturing_plan": context.get("manufacturing", {}),
            "markdown_report": report_output.get("markdown_report", "# Engineering Report"),
            "json_report": report_output.get("json_report", context),
            "created_at": datetime.utcnow()
        }

        await reports_col.insert_one(report_doc)

        # Finalize execution & project status
        finish_log = f"[COMPLETE] All 6 AI Agents executed successfully. Report #{report_id} generated."
        await executions_col.update_one(
            {"id": execution_id},
            {"$set": {
                "status": "completed",
                "progress_percentage": 100,
                "report_id": report_id,
                "completed_at": datetime.utcnow()
            },
            "$push": {"logs": finish_log}}
        )

        await projects_col.update_one(
            {"id": project_id},
            {"$set": {
                "status": "completed",
                "last_execution_id": execution_id,
                "updated_at": datetime.utcnow()
            }}
        )
        logger.info(f"Pipeline execution {execution_id} completed successfully.")

pipeline_runner = AgentPipelineRunner()
