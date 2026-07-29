# ⚙️ ForgeMind X — Autonomous AI Manufacturing Platform

> **AI-Powered Autonomous Manufacturing & Engineering Orchestrator**  
> Sequentially orchestrates **6 specialized AI engineering agents** powered by **NVIDIA NIM (Llama 3.1 70B Instruct)** to deliver complete 3D CAD parameters, FEA structural stress simulations, Bill of Materials (BOM), 5-axis CNC machining workflows, cost estimates, and executive PDF reports from a single product idea.

---

## 🌟 Key Features

- 🤖 **6-Agent Autonomous Engineering Pipeline**: Sequential AI pipeline handling requirements, 3D CAD design, FEA simulation, 5-axis manufacturing, cost calculation, and executive reporting.
- 🧊 **Interactive 3D Parametric Viewer**: Real-time WebGL/Three.js rendering of generated CAD models directly in the browser with dimensions and orbit controls.
- 🔬 **FEA & Safety Factor Analytics**: Interactive stress distribution charts and von Mises stress computations.
- 📊 **Dynamic Bill of Materials (BOM)**: Interactive itemized cost table with raw material, machining, and labor breakdowns.
- 📄 **Executive PDF Generation**: One-click generation and download of complete engineering reports via ReportLab.
- ⚡ **Zero-Setup In-Memory Fallbacks**: Automated in-memory database fallback if MongoDB is offline, plus structured AI fallbacks if an NVIDIA API key is omitted.

---

## 🏛️ Sequential 6-Agent Architecture

```
                                  [ User Product Prompt ]
                                             │
                                             ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│ 1. 📋 Requirements Agent   ──► Extracts engineering specs, load limits & material selection│
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 2. 📐 Design Agent         ──► Generates 3D CAD parametric geometry & dimensions       │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 3. 🔬 Simulation Agent     ──► Computes FEA von Mises stress & safety factor math     │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 4. 🛠️ Manufacturing Agent  ──► Determines CNC 5-axis toolpaths, G-code & tolerance    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 5. 💰 Cost Agent           ──► Calculates raw material, machining time & unit costs    │
├────────────────────────────────────────────────────────────────────────────────────────┤
│ 6. 📄 Report Agent         ──► Synthesizes final executive PDF & structured report     │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 📁 Repository Directory Structure

```
ForgeMind-X/
├── .gitignore                      # Git exclusion rules for node_modules, .next, .env, and caches
├── README.md                       # Platform documentation and quickstart guide
├── test_auth.py                    # Independent authentication test script
│
├── ⚙️ backend/                     # FastAPI 0.140 + Python 3.12 Backend Server
│   ├── .env.example                # Backend environment variable template
│   ├── requirements.txt            # Python dependencies (FastAPI, Motor, PyJWT, ReportLab)
│   ├── verify_api.py               # Automated end-to-end API test verification suite
│   │
│   └── app/
│       ├── main.py                 # FastAPI application entry point & CORS configuration
│       │
│       ├── 🤖 agents/              # The 6 Specialized Engineering AI Agents
│       │   ├── base.py             # Base agent interface definition
│       │   ├── requirements_agent.py # Agent 1: Analyzes product prompts & extracts specs
│       │   ├── design_agent.py     # Agent 2: Generates CAD 3D geometric dimensions
│       │   ├── simulation_agent.py # Agent 3: FEA von Mises stress & safety factors
│       │   ├── manufacturing_agent.py # Agent 4: 5-axis CNC toolpaths & tolerances
│       │   ├── cost_agent.py       # Agent 5: Material, labor & tooling cost breakdown
│       │   └── report_agent.py     # Agent 6: Report synthesis & PDF generation trigger
│       │
│       ├── 🌐 api/                 # REST API Router Endpoints
│       │   ├── auth.py             # [/api/auth] User registration & JWT authentication
│       │   ├── projects.py         # [/api/projects] Project CRUD & prompt creation
│       │   ├── executions.py       # [/api/executions] Real-time agent execution pipeline
│       │   ├── reports.py          # [/api/reports] Structured reports & PDF download
│       │   └── settings.py         # [/api/settings] NVIDIA API key & model configuration
│       │
│       ├── 🔒 core/                # Core Configuration & Security
│       │   ├── config.py           # Application settings & environment loader
│       │   ├── database.py         # MongoDB Motor async driver with In-Memory fallback
│       │   └── security.py         # Password hashing (SHA-256) & JWT token validation
│       │
│       ├── 📦 models/              # Pydantic Schemas & MongoDB Document Models
│       │   ├── user.py             # User authentication & token schemas
│       │   ├── project.py          # Project schema & prompt models
│       │   ├── execution.py        # Pipeline execution & agent log models
│       │   └── report.py           # Final engineering report schema
│       │
│       └── 🛠️ services/            # Core Business Logic & Infrastructure
│           ├── nvidia_client.py    # NVIDIA NIM LLM inference client (Llama 3.1 70B)
│           ├── agent_runner.py     # Multi-agent pipeline execution orchestrator
│           └── pdf_generator.py    # ReportLab PDF report generation engine
│
└── 💻 frontend/                    # Next.js 14.2 + React 18 + Tailwind CSS Frontend
    ├── .env.local.example          # Frontend environment variable template
    ├── package.json                # Node dependencies (Next.js, Three.js, Lucide, Recharts)
    ├── tailwind.config.js          # Custom theme & industrial color palette
    │
    ├── app/                        # Next.js App Router Pages
    │   ├── page.tsx                # Hero page showcasing platform capabilities
    │   ├── login/page.tsx          # User authentication login view
    │   ├── register/page.tsx       # User registration view
    │   ├── dashboard/page.tsx      # Main engineering dashboard & quick metrics
    │   ├── projects/page.tsx       # Project list, creation modal & prompt submission
    │   ├── executions/[id]/page.tsx# Real-time multi-agent execution pipeline & live logs
    │   ├── reports/[id]/page.tsx   # Comprehensive report viewer (3D CAD, BOM, FEA, PDF download)
    │   └── settings/page.tsx       # Settings panel for NVIDIA API key & model tuning
    │
    └── components/                 # React Components
        ├── 🧊 viewer/              # 3D Interactive Parametric Model Viewer (Three.js/Fiber)
        │   ├── scene.tsx           # 3D Canvas container & lighting setup
        │   ├── parametric-model.tsx# Dynamic 3D geometric mesh derived from Design Agent
        │   ├── dimension-labels.tsx# Overlay annotations for length, width, height
        │   ├── camera-controls.tsx # Interactive orbit controls
        │   └── grid.tsx            # Engineering grid floor
        │
        ├── 📊 reports/             # Engineering Report Components
        │   ├── bom-table.tsx       # Interactive Bill of Materials cost table
        │   ├── fea-chart.tsx       # Stress distribution & safety factor chart
        │   └── markdown-viewer.tsx # Formatted Markdown renderer for agent outputs
        │
        ├── 🔄 executions/          # Pipeline Visualizers
        │   ├── execution-pipeline.tsx # Step-by-step progress bar for 6 agents
        │   └── agent-log-viewer.tsx   # Live stream viewer for agent logs
        │
        └── 🎨 ui/ & layout/        # Shared UI Components & Layout Shell
            ├── shell.tsx           # Application layout shell with Navigation
            ├── sidebar.tsx         # Sidebar navigation menu
            └── header.tsx          # Header bar with user profile & status
```

---

## 🚀 Quick Start Guide

### 1. Backend Setup (FastAPI + Python 3.12)

```bash
cd backend
py -3.12 -m pip install -r requirements.txt
py -3.12 -m uvicorn app.main:app --reload --port 8000
```
- **API Documentation**: Open [http://localhost:8000/docs](http://localhost:8000/docs) in your browser.

### 2. Frontend Setup (Next.js 14 + React 18)

```bash
cd frontend
npm install
npm run dev
```
- **Web Application**: Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 🛠️ Environment Configuration

### Backend (`backend/.env`)
Create a `.env` file in `backend/` using `backend/.env.example` as a template:
```env
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=forgemind
JWT_SECRET_KEY=forgemind_super_secret_jwt_key_2026_x_auth_key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
NVIDIA_API_KEY=           # Optional: Your NVIDIA NIM API key
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL=meta/llama-3.1-70b-instruct
```

### Frontend (`frontend/.env.local`)
Create a `.env.local` file in `frontend/` using `frontend/.env.local.example`:
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## 💡 Smart Fallback Engine

- **Database Fallback**: If a MongoDB server is not running locally, the backend automatically activates an **in-memory database engine**.
- **AI Inference Fallback**: If `NVIDIA_API_KEY` is omitted, the 6 agents utilize **intelligent structured engineering fallbacks** so the entire platform works out-of-the-box. You can add your API key anytime in Settings (`/settings`).

---

## 💻 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | Next.js 14.2 (App Router), React 18 |
| **Language** | TypeScript 5 & Python 3.12 |
| **Styling & UI** | Tailwind CSS 3, Lucide React Icons |
| **3D Rendering** | Three.js, React Three Fiber |
| **State Management** | Zustand, React Query |
| **Charts** | Recharts 2 |
| **Backend Framework** | FastAPI 0.140 |
| **Database** | Motor (MongoDB Async) / In-Memory Fallback |
| **Authentication** | PyJWT + SHA-256 |
| **PDF Generation** | ReportLab 4 |
| **AI Inference** | NVIDIA NIM API (LLAMA 3.1 70B Instruct) |

---

## 🧪 Testing & Verification

To run backend tests:
```bash
cd backend
py -3.12 -m pytest
```

To run end-to-end API verification:
```bash
cd backend
py -3.12 verify_api.py
```
