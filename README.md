# ForgeMind X — Autonomous AI Manufacturing Platform

> AI-powered autonomous manufacturing platform orchestrating **6 specialized AI engineering agents** sequentially to deliver complete CAD specs, FEA structural simulations, Bill of Materials, and 5-axis manufacturing workflows from a single product idea.

---

## Quick Start

### Backend (FastAPI + Python 3.12)
```bash
cd backend
py -3.12 -m pip install -r requirements.txt
py -3.12 -m uvicorn app.main:app --reload --port 8000
```
API Docs available at: http://localhost:8000/docs

### Frontend (Next.js 14 + React 18)
```bash
cd frontend
npm install
npm run dev
```
App available at: http://localhost:3000

---

## Environment Variables

### Backend (`backend/.env`)
```
MONGODB_URI=mongodb://localhost:27017
MONGODB_DATABASE=forgemind
JWT_SECRET_KEY=forgemind_super_secret_jwt_key_2026_x_auth_key
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=60
NVIDIA_API_KEY=           # Your NVIDIA NIM API key
NVIDIA_BASE_URL=https://integrate.api.nvidia.com/v1
NVIDIA_MODEL=meta/llama-3.1-70b-instruct
```

### Frontend (`frontend/.env.local`)
```
NEXT_PUBLIC_API_URL=http://localhost:8000
```

---

## MongoDB Note
If MongoDB is not running locally, the backend automatically activates an **in-memory engine** so the application works immediately out of the box. To persist data, run MongoDB locally or configure MongoDB Atlas in `MONGODB_URI`.

---

## NVIDIA NIM API Note
If `NVIDIA_API_KEY` is not set, the platform uses **intelligent structured fallback responses** for all 6 engineering agents. Set the key in Settings (`/settings`) to enable live NVIDIA LLAMA 3.1-70B inference.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend Framework | Next.js 14.2, React 18 |
| Language | TypeScript 5 |
| Styling | Tailwind CSS 3 |
| State Management | Zustand + React Query |
| Forms | React Hook Form + Zod |
| Charts | Recharts 2 |
| Backend Framework | FastAPI 0.140 |
| Language | Python 3.12 |
| ORM / Driver | Motor (MongoDB async) |
| Auth | PyJWT + SHA-256 |
| AI Service | NVIDIA NIM API (LLAMA-3.1-70B) |
| Database | MongoDB Motor / In-Memory Fallback |

---

## Running Tests
```bash
cd backend
py -3.12 -m pytest
```
```
3 passed in 0.63s
```
