# 🧪 MVP Build Test – Family Investment Dashboard

## Overview

This is a short tech assessment to evaluate your ability to quickly build and deliver a working MVP for a real-world fintech product. The scenario is a simplified parent-child investment dashboard, focusing on a child-friendly experience with view-only access and family communication.
 
## 🎯 Goal

Create a working prototype of a child’s investment dashboard that pulls mock investment data, displays it in a simple, engaging format, and includes a family group chat feature shared across parent, co-parent, and child users.
 
## 👥 User Roles

There are 3 roles in this system:

- parent: Primary account owner, has full access to data and chat
- child: View-only dashboard, access to chat
- co-parent: View-only access (same as parent), access to chat
For the MVP, you can hardcode one mock family group and switch roles during login.
 
## ✅ MVP Features to Build
1. Login Page
    - Role selector (parent / child / co-parent)
    - Dummy username field
    - On login, route to appropriate view
 
2. Child Dashboard

    Show:

    - Total investment value (e.g., “You have $3,200 today”)
    - Monthly change (e.g., “⬆️ Your money grew by $120 this month”)
    - Simple growth chart (line chart – use dummy data)
    - List of 3–5 known brands (e.g., Apple, Nike, Tesla – logos and friendly names)
    - Button: “Ask My Parent” → opens group chat
 
3. Family Group Chat

- Shared chat view between parent, child, and co-parent
- Each message should show:
    - Sender (role: Parent, Child, Co-Parent)
    - Timestamp
- Basic styling + emoji support encouraged
 
## 🔧 Tech Stack

Recommended (but flexible):

- Frontend: React (or Next.js)
- Backend: Node.js + Express
- Mock Data: JSON files or in-memory storage
- UI: Basic CSS/React styling or Tailwind
No database or authentication setup required—mock data only.
 
## 📦 Folder Structure (Suggested)
```bash
CopyEdit
/mvp-invest-dashboard
├── /frontend
│   ├── /components
│   ├── /pages
│   ├── App.js
│   └── ...
├── /backend
│   ├── /routes
│   ├── /controllers
│   ├── /mock-data
│   └── server.js
└── README.md
```
 
## 🚀 Setup Instructions
1. Clone the repo
bash
CopyEdit
git clone https://github.com/your-username/mvp-invest-dashboard.git
cd mvp-invest-dashboard
2. Start backend
bash
CopyEdit
cd backend
npm install
npm start
3. Start frontend
bash
CopyEdit
cd frontend
npm install
npm start
 
## 📋 Deliverables
- ✅ Working codebase (frontend + backend)
- ✅ README with setup instructions
- ✅ GitHub repo or ZIP file with code
- ✅ Optional: Live demo link (Netlify, Vercel, etc.)

