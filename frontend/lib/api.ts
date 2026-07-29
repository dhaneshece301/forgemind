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
      // Axios 1.x AxiosHeaders handles direct assignment gracefully in most cases,
      // but using .set() is preferred. We'll do both or rely on .set() correctly.
      if (config.headers && typeof config.headers.set === "function") {
        config.headers.set("Authorization", `Bearer ${token}`);
      } else {
        (config.headers as any)["Authorization"] = `Bearer ${token}`;
      }
      console.log("[Axios Interceptor] Attached token:", token.substring(0, 10) + "...");
    } else {
      console.warn("[Axios Interceptor] No token found in localStorage");
    }
  }
  return config;
});


// Handle 401 Unauthorized responses globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("forgemind_token");
        localStorage.removeItem("forgemind_user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

// API Service Call Methods
export const authApi = {
  register: async (payload: any) => {
    const res = await api.post("/auth/register", payload);
    return res.data;
  },
  login: async (payload: any) => {
    const res = await api.post("/auth/login", payload);
    return res.data;
  },
  getMe: async (): Promise<User> => {
    const res = await api.get("/auth/me");
    return res.data;
  },
};

export const projectsApi = {
  list: async (search?: string, status?: string): Promise<Project[]> => {
    const res = await api.get("/projects", { params: { search, status_filter: status } });
    return res.data;
  },
  get: async (id: string): Promise<Project> => {
    const res = await api.get(`/projects/${id}`);
    return res.data;
  },
  create: async (payload: any): Promise<Project> => {
    const res = await api.post("/projects", payload);
    return res.data;
  },
  update: async (id: string, payload: any): Promise<Project> => {
    const res = await api.put(`/projects/${id}`, payload);
    return res.data;
  },
  delete: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  },
};

export const executionsApi = {
  create: async (projectId: string): Promise<Execution> => {
    const res = await api.post("/executions", { project_id: projectId });
    return res.data;
  },
  list: async (projectId?: string): Promise<Execution[]> => {
    const res = await api.get("/executions", { params: { project_id: projectId } });
    return res.data;
  },
  get: async (id: string): Promise<Execution> => {
    const res = await api.get(`/executions/${id}`);
    return res.data;
  },
};

export const reportsApi = {
  list: async (projectId?: string): Promise<EngineeringReport[]> => {
    const res = await api.get("/reports", { params: { project_id: projectId } });
    return res.data;
  },
  get: async (id: string): Promise<EngineeringReport> => {
    const res = await api.get(`/reports/${id}`);
    return res.data;
  },
  exportMarkdown: async (id: string) => {
    const res = await api.get(`/reports/${id}/export/markdown`);
    return res.data;
  },
  exportJson: async (id: string) => {
    const res = await api.get(`/reports/${id}/export/json`);
    return res.data;
  },
  exportPdf: async (id: string) => {
    const res = await api.get(`/reports/${id}/export/pdf`, { responseType: "blob" });
    return res.data;
  },
};

export const settingsApi = {
  get: async (): Promise<SystemSettings> => {
    const res = await api.get("/settings");
    return res.data;
  },
  update: async (payload: any): Promise<SystemSettings> => {
    const res = await api.put("/settings", payload);
    return res.data;
  },
};
