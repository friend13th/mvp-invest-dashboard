# Family Investment Dashboard MVP

A child-friendly investment dashboard that allows parents and children to view investments and communicate through a family group chat.

## Features

- Role-based access (Parent, Child, Co-Parent)
- Child-friendly investment dashboard
- Family group chat
- Mock investment data visualization

## Tech Stack

- Frontend: React with TypeScript
- Backend: Node.js + Express with TypeScript
- Styling: Material UI
- Mock Data: JSON files

## Project Structure

```
/mvp-invest-dashboard
├── /frontend
│   ├── /src
│   │   ├── /components
│   │   ├── /pages
│   │   ├── /services
│   │   ├── App.tsx
│   │   └── index.tsx
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
├── /backend
│   ├── /src
│   │   ├── /controllers
│   │   ├── /mock-data
│   │   ├── /routes
│   │   └── server.ts
│   ├── public/
│   ├── package.json
│   └── tsconfig.json
└── README.md
```

## Setup Instructions

1.  **Clone the repository**
    ```bash
    git clone <your-repo-url> 
    cd mvp-invest-dashboard
    ```

2.  **Setup Backend**
    ```bash
    cd backend
    npm install
    # Create a .env file if needed (e.g., for PORT)
    npm start 
    # Or use `npm run dev` for development with Nodemon
    ```
    The backend server will typically start on port 3001.

3.  **Setup Frontend**
    ```bash
    cd ../frontend 
    npm install
    # Create a .env file and add REACT_APP_API_BASE_URL=http://localhost:3001
    npm start 
    ```
    The frontend development server will typically start on port 3000.

4.  **Access the application**
    Open your browser and navigate to `http://localhost:3000` (or the port your frontend server started on).

## Mock Data

The project uses mock JSON data located in `backend/src/mock-data/` for:
- Family groups (`familyGroups.json`)
- User investments (`investments.json`)
- User portfolios (`portfolio.json`)
- Chat messages (`chatMessages.json`)

Logos used in the dashboard are served statically from `backend/public/logos/`.

## Available Scripts

### Backend (`/backend` directory)
- `npm start`: Runs the compiled backend server (after `npm run build` if not using ts-node-dev or similar).
- `npm run build`: Compiles TypeScript to JavaScript (output usually in a `dist` folder).
- `npm run dev`: Runs the backend server using `nodemon` and `ts-node` for development with auto-reloading.

### Frontend (`/frontend` directory)
- `npm start`: Runs the app in development mode.
- `npm run build`: Builds the app for production to the `build` folder.
- `npm test`: Launches the test runner in interactive watch mode.
- `npm run eject`: Removes the single build dependency (use with caution).

## Deployment

### Frontend Deployment (Vercel)

1. Create an account on [Vercel](https://vercel.com)
2. Install Vercel CLI (optional):
   ```bash
   npm install -g vercel
   ```
3. Add environment variable in Vercel project settings:
   ```
   REACT_APP_API_BASE_URL=https://your-backend-url.onrender.com
   ```
4. Deploy using one of these methods:
   - Connect your GitHub repository to Vercel for automatic deployments
   - Or use Vercel CLI:
     ```bash
     cd frontend
     vercel
     ```

### Backend Deployment (Render)

1. Create an account on [Render](https://render.com)
2. Create a new Web Service
3. Connect your GitHub repository
4. Configure the service:
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm start`
   - **Environment Variables:**
     ```
     PORT=3001
     NODE_ENV=production
     ```
5. Deploy your service

### Important Notes

- Update CORS settings in backend/src/server.ts to allow requests from your frontend domain:
  ```typescript
  app.use(cors({
    origin: ['https://your-frontend-domain.vercel.app']
  }));
  ```
- Ensure all environment variables are properly set in both frontend and backend deployments
- The free tier may have cold starts, which is normal for hobby projects