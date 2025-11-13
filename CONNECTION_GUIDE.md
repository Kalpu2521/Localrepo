# Frontend-Backend Connection Guide

This guide explains how the frontend and backend are connected in this project.

## Architecture Overview

- **Frontend**: React + Vite application running on port `5173` (development)
- **Backend**: Express.js server running on port `8000`
- **Database**: MongoDB (configured via `MONGO_URI`)

## Development Setup

### 1. Backend Setup

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```

2. Create a `.env` file (see `backend/ENV_BLUEPRINT.md` for details):
   ```env
   MONGO_URI=your_mongodb_connection_string
   PORT=8000
   JWT_SECRET=your_secret_key
   CORS_ORIGIN=*
   ```

3. Install dependencies and start the server:
   ```bash
   npm install
   npm start
   ```

   The backend should now be running on `http://localhost:8000`

### 2. Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```

2. (Optional) Create a `.env` file if you need custom configuration:
   ```env
   # Usually not needed - proxy is configured by default
   VITE_API_URL=
   VITE_PROXY_TARGET=http://localhost:8000
   ```

3. Install dependencies and start the dev server:
   ```bash
   npm install
   npm run dev
   ```

   The frontend should now be running on `http://localhost:5173`

## How They Connect

### Development Mode

1. **Vite Proxy**: The frontend uses Vite's proxy feature to forward API requests
   - Frontend makes requests to `/api/*`
   - Vite proxy forwards them to `http://localhost:8000/api/*`
   - This avoids CORS issues during development

2. **API Client**: The frontend uses `src/lib/api.js` which:
   - Uses axios for HTTP requests
   - Automatically handles authentication tokens
   - Works with the Vite proxy in development

3. **CORS**: The backend is configured to accept requests from the frontend origin

### Production Mode

1. **Build Frontend**: 
   ```bash
   cd frontend
   npm run build
   ```
   This builds the frontend into `backend/public`

2. **Serve from Backend**: 
   ```bash
   cd backend
   npm start
   ```
   The backend serves both:
   - Static frontend files from `/`
   - API endpoints from `/api/*`

3. **API Calls**: In production, the frontend uses relative paths (`/api/*`) since it's served from the same origin

## API Endpoints

The backend exposes the following API routes:

- `/api/auth/*` - Authentication (register, login, me)
- `/api/donors/*` - Donor management
- `/api/hospitals/*` - Hospital management
- `/api/recipients/*` - Recipient management
- `/api/emergencies/*` - Emergency requests
- `/api/admin/*` - Admin operations
- `/api/search/*` - Search functionality
- `/health` - Health check endpoint

## Environment Variables

See the blueprint files for detailed environment variable documentation:
- `backend/ENV_BLUEPRINT.md` - Backend environment variables
- `frontend/ENV_BLUEPRINT.md` - Frontend environment variables

## Troubleshooting

### CORS Errors
- Make sure `CORS_ORIGIN` in backend `.env` includes your frontend URL
- For development: `CORS_ORIGIN=*` or `CORS_ORIGIN=http://localhost:5173`

### API Not Found
- Verify backend is running on port 8000
- Check that `VITE_PROXY_TARGET` matches your backend URL
- Ensure backend routes are mounted correctly

### Connection Refused
- Verify MongoDB connection string is correct
- Check that backend server started successfully
- Ensure no firewall is blocking the ports

## Quick Start Commands

```bash
# Terminal 1 - Backend
cd backend
npm install
npm start

# Terminal 2 - Frontend
cd frontend
npm install
npm run dev
```

Then open `http://localhost:5173` in your browser!

