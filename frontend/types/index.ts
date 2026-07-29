export interface User {
  id: string;
  email: string;
  full_name: string;
  created_at: string;
  is_active: boolean;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
}

export interface Project {
  id: string;
  user_id: string;
  title: string;
  description: string;
  category: string;
  target_budget: number;
  target_timeline_weeks: number;
  status: 'draft' | 'queued' | 'executing' | 'completed' | 'failed';
  created_at: string;
  updated_at: string;
  execution_count: number;
  last_execution_id?: string | null;
}

export interface AgentProgressStatus {
  agent_id: 'requirements' | 'design' | 'simulation' | 'cost' | 'manufacturing' | 'report';
  name: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  started_at?: string;
  completed_at?: string;
  output_summary?: string;
}

export interface Execution {
  id: string;
  project_id: string;
  user_id: string;
  status: 'queued' | 'running' | 'completed' | 'failed';
  current_agent?: string | null;
  progress_percentage: number;
  agent_statuses: AgentProgressStatus[];
  logs: string[];
  report_id?: string | null;
  created_at: string;
  completed_at?: string | null;
  error_message?: string | null;
}

export interface EngineeringReport {
  id: string;
  execution_id: string;
  project_id: string;
  user_id: string;
  title: string;
  executive_summary: string;
  requirements: Record<string, any>;
  product_design: Record<string, any>;
  engineering_simulation: Record<string, any>;
  cost_and_procurement: Record<string, any>;
  manufacturing_plan: Record<string, any>;
  markdown_report: string;
  json_report: Record<string, any>;
  created_at: string;
}

export interface SystemSettings {
  nvidia_api_key_configured: boolean;
  nvidia_model: string;
  nvidia_base_url: string;
  mongodb_status: string;
  theme: string;
}
