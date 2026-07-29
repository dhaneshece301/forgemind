import asyncio
import httpx

async def verify():
    base = "http://localhost:8000/api"
    async with httpx.AsyncClient() as c:
        # 1. Register
        r = await c.post(f"{base}/auth/register", json={
            "email": "verify3@forgemind.ai",
            "password": "TestPass123!",
            "full_name": "QA Engineer"
        })
        print("REGISTER:", r.status_code)
        token = r.json().get("access_token")
        print("TOKEN:", token[:20] + "..." if token else "NONE")

        headers = {"Authorization": f"Bearer {token}"}

        # 2. Create Project
        r2 = await c.post(f"{base}/projects", headers=headers, json={
            "title": "Titanium Drone Frame",
            "description": "Lightweight quadcopter chassis for high altitude payload delivery",
            "category": "Aerospace",
            "target_budget": 75000,
            "target_timeline_weeks": 14
        })
        print("CREATE PROJECT:", r2.status_code)
        proj_id = r2.json().get("id")
        print("PROJECT ID:", proj_id)

        # 3. Create Execution
        r3 = await c.post(f"{base}/executions", headers=headers, json={"project_id": proj_id})
        print("CREATE EXECUTION:", r3.status_code)
        exec_id = r3.json().get("id")
        print("EXECUTION ID:", exec_id)

        # 4. Poll until complete
        for i in range(12):
            await asyncio.sleep(1)
            r4 = await c.get(f"{base}/executions/{exec_id}", headers=headers)
            d = r4.json()
            status = d.get("status")
            pct = d.get("progress_percentage")
            print(f"  Poll {i+1}: status={status} progress={pct}%")
            if status in ("completed", "failed"):
                report_id = d.get("report_id")
                print("REPORT ID:", report_id)
                if report_id:
                    r5 = await c.get(f"{base}/reports/{report_id}", headers=headers)
                    rep = r5.json()
                    print("REPORT TITLE:", rep.get("title"))
                    summary = rep.get("executive_summary", "")
                    print("EXECUTIVE SUMMARY:", summary[:120])
                    bom = rep.get("cost_and_procurement", {}).get("bill_of_materials", [])
                    print("BOM ITEMS:", len(bom))
                break

        # 5. Settings check
        r6 = await c.get(f"{base}/settings", headers=headers)
        print("SETTINGS STATUS:", r6.status_code)
        print("SETTINGS:", r6.json())

asyncio.run(verify())
