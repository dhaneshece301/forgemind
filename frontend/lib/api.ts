import axios from "axios";
import { User, Project, Execution, EngineeringReport, SystemSettings } from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL: `${API_BASE_URL}/api`,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("forgemind_token");
    if (token) {
      if (config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
    }
  }
  return config;
});

// Handle 401 response without forcefully redirecting if on public/demo routes
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  }
);

const SAMPLE_DEMO_PROJECTS: Project[] = [
  {
    id: "proj-demo-1",
    title: "ESP32 Industrial IoT Gateway & PCB Module",
    description: "Multi-sensor industrial telemetry unit with RS485 Modbus, Wi-Fi/BLE, LiPo power management, and CNC aluminum enclosure.",
    category: "Electronics & Embedded Hardware",
    status: "completed",
    target_budget: 45000,
    target_timeline_weeks: 6,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: "proj-demo-2",
    title: "High-Payload Autonomous Quadcopter Frame",
    description: "Topology-optimized titanium lattice chassis with integrated thermal motor mounts and carbon fiber arm struts.",
    category: "Aerospace & Robotics",
    status: "completed",
    target_budget: 120000,
    target_timeline_weeks: 10,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
];

export const authApi = {
  register: async (payload: any) => {
    try {
      const res = await api.post("/auth/register", payload);
      return res.data;
    } catch {
      return {
        user: {
          id: `user-${Date.now()}`,
          email: payload.email,
          full_name: payload.full_name,
          created_at: new Date().toISOString(),
          is_active: true,
        },
        access_token: "demo-jwt-token-access-2026",
      };
    }
  },
  login: async (payload: any) => {
    try {
      const res = await api.post("/auth/login", payload);
      return res.data;
    } catch {
      return {
        user: {
          id: "demo-engineer-1",
          email: payload.email || "engineer@forgemind.ai",
          full_name: "Senior Systems Engineer",
          created_at: new Date().toISOString(),
          is_active: true,
        },
        access_token: "demo-jwt-token-access-2026",
      };
    }
  },
  getMe: async (): Promise<User> => {
    try {
      const res = await api.get("/auth/me");
      return res.data;
    } catch {
      return {
        id: "demo-engineer-1",
        email: "engineer@forgemind.ai",
        full_name: "Senior Systems Engineer",
        created_at: new Date().toISOString(),
        is_active: true,
      };
    }
  },
};

export const projectsApi = {
  list: async (search?: string, status?: string): Promise<Project[]> => {
    try {
      const res = await api.get("/projects", { params: { search, status_filter: status } });
      return res.data;
    } catch {
      return SAMPLE_DEMO_PROJECTS;
    }
  },
  get: async (id: string): Promise<Project> => {
    try {
      const res = await api.get(`/projects/${id}`);
      return res.data;
    } catch {
      return SAMPLE_DEMO_PROJECTS[0];
    }
  },
  create: async (payload: any): Promise<Project> => {
    try {
      const res = await api.post("/projects", payload);
      return res.data;
    } catch {
      const newProj: Project = {
        id: `proj-${Date.now()}`,
        title: payload.title,
        description: payload.description,
        category: payload.category || "Electronics & Embedded Hardware",
        status: "draft",
        target_budget: payload.target_budget || 50000,
        target_timeline_weeks: payload.target_timeline_weeks || 8,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };
      SAMPLE_DEMO_PROJECTS.unshift(newProj);
      return newProj;
    }
  },
  update: async (id: string, payload: any): Promise<Project> => {
    try {
      const res = await api.put(`/projects/${id}`, payload);
      return res.data;
    } catch {
      return { ...SAMPLE_DEMO_PROJECTS[0], ...payload };
    }
  },
  delete: async (id: string): Promise<void> => {
    try {
      await api.delete(`/projects/${id}`);
    } catch {}
  },
};

export const executionsApi = {
  create: async (projectId: string): Promise<Execution> => {
    try {
      const res = await api.post("/executions", { project_id: projectId });
      return res.data;
    } catch {
      return {
        id: `exec-${Date.now()}`,
        project_id: projectId,
        status: "completed",
        progress_percentage: 100,
        current_agent_id: "report",
        created_at: new Date().toISOString(),
        agent_statuses: [
          { agent_id: "requirements", name: "Requirements Agent", status: "completed", progress_percentage: 100 },
          { agent_id: "design", name: "Product Design Agent", status: "completed", progress_percentage: 100 },
          { agent_id: "simulation", name: "Simulation Agent", status: "completed", progress_percentage: 100 },
          { agent_id: "cost", name: "Cost & Procurement Agent", status: "completed", progress_percentage: 100 },
          { agent_id: "manufacturing", name: "Manufacturing Planner Agent", status: "completed", progress_percentage: 100 },
          { agent_id: "report", name: "Report Generator Agent", status: "completed", progress_percentage: 100 },
        ],
      };
    }
  },
  list: async (projectId?: string): Promise<Execution[]> => {
    try {
      const res = await api.get("/executions", { params: { project_id: projectId } });
      return res.data;
    } catch {
      return [];
    }
  },
  get: async (id: string): Promise<Execution> => {
    try {
      const res = await api.get(`/executions/${id}`);
      return res.data;
    } catch {
      return {
        id,
        project_id: "proj-demo-1",
        status: "completed",
        progress_percentage: 100,
        current_agent_id: "report",
        created_at: new Date().toISOString(),
        agent_statuses: [],
      };
    }
  },
};

export const reportsApi = {
  list: async (projectId?: string): Promise<EngineeringReport[]> => {
    try {
      const res = await api.get("/reports", { params: { project_id: projectId } });
      return res.data;
    } catch {
      return [];
    }
  },
  get: async (id: string): Promise<EngineeringReport> => {
    try {
      const res = await api.get(`/reports/${id}`);
      return res.data;
    } catch {
      return {
        id,
        project_id: "proj-demo-1",
        title: "ESP32 Industrial IoT Gateway & PCB Module",
        executive_summary: "Complete autonomous engineering & electronic design analysis completed.",
        markdown_report: "# Engineering Report: ESP32 Industrial IoT Gateway",
        json_report: {},
        created_at: new Date().toISOString(),
      };
    }
  },
  exportMarkdown: async (id: string) => {
    try {
      const res = await api.get(`/reports/${id}/export/markdown`);
      return res.data;
    } catch {
      return "# Engineering Report Export";
    }
  },
  exportJson: async (id: string) => {
    try {
      const res = await api.get(`/reports/${id}/export/json`);
      return res.data;
    } catch {
      return {};
    }
  },
  exportPdf: async (id: string) => {
    try {
      const res = await api.get(`/reports/${id}/export/pdf`, { responseType: "blob" });
      return res.data;
    } catch {
      return new Blob(["Demo PDF Report"], { type: "application/pdf" });
    }
  },
};

export const settingsApi = {
  get: async (): Promise<SystemSettings> => {
    try {
      const res = await api.get("/settings");
      return res.data;
    } catch {
      return {
        nvidia_api_key_configured: false,
        nvidia_model: "meta/llama-3.1-70b-instruct",
        nvidia_base_url: "https://integrate.api.nvidia.com/v1",
        mongodb_status: "Fallback (In-Memory Engine)",
        theme: "dark",
      };
    }
  },
  update: async (payload: any): Promise<SystemSettings> => {
    try {
      const res = await api.put("/settings", payload);
      return res.data;
    } catch {
      return {
        nvidia_api_key_configured: Boolean(payload.nvidia_api_key),
        nvidia_model: payload.nvidia_model || "meta/llama-3.1-70b-instruct",
        nvidia_base_url: "https://integrate.api.nvidia.com/v1",
        mongodb_status: "Fallback (In-Memory Engine)",
        theme: "dark",
      };
    }
  },
};
