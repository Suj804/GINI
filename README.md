# GINI – AI-Powered Multi-Tool Productivity Platform (PERN)

## Structure
```
backend/
  server.js                 entry point
  src/app.js                express app
  src/config/               env, db pool, schema
  src/middleware/           auth (JWT/admin), upload, error
  src/routes/               auth, workspace, output, ai, admin
  src/controllers/          request handlers
  src/services/credits.js   credit deduction / refund / usage log
  src/utils/                http helpers, AI + image helpers
frontend/src/
  api.js  context/AuthContext.jsx  components/  pages/
```
## Run
1. `createdb gini` (tables are auto-created)
2. `cd backend && cp .env.example .env` → set DATABASE_URL password + free GEMINI_API_KEY (aistudio.google.com/app/apikey) → `npm install && npm start`
3. `cd frontend && npm install && npm run dev` → http://localhost:5173
First registered user = admin. New users get 100 credits.
