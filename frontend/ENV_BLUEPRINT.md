# Frontend Environment Variables Blueprint

Create a `.env` file in the `frontend` directory with the following variables:

## Environment Variables

```env
# API Configuration
# For development: Leave empty to use Vite proxy (recommended)
# For production: Set to your backend API URL
VITE_API_URL=

# Proxy Target (Development only)
# Backend URL for Vite dev server proxy
# Only needed if your backend runs on a different port
VITE_PROXY_TARGET=http://localhost:8000
```

## Variable Descriptions

### VITE_API_URL
- **Required**: No (for development)
- **Description**: Base URL for the backend API
- **Development**: Leave empty (uses Vite proxy configured in `vite.config.js`)
- **Production**: Set to your backend API URL
  - Local: `http://localhost:8000`
  - Remote: `https://api.yourdomain.com`
- **Default**: Empty (uses proxy in dev, `/api` in production build)

### VITE_PROXY_TARGET
- **Required**: No
- **Description**: Backend URL for Vite dev server proxy (development only)
- **Example**: `http://localhost:8000`
- **Default**: `http://localhost:8000`
- **Note**: Only used when Vite dev server is running

## Usage Scenarios

### Development (Recommended)
```env
# Leave VITE_API_URL empty or unset
# The Vite dev server will proxy /api requests to http://localhost:8000
```

### Production (Standalone Frontend)
```env
# Set to your backend API URL
VITE_API_URL=http://localhost:8000
# or
VITE_API_URL=https://api.yourdomain.com
```

### Production (Served from Backend)
```env
# Leave empty - frontend will be built and served from backend/public
# API calls will use relative paths (/api)
VITE_API_URL=
```

## How It Works

1. **Development Mode**:
   - If `VITE_API_URL` is empty, the frontend uses Vite's proxy
   - Proxy redirects `/api/*` requests to `http://localhost:8000`
   - Frontend runs on `http://localhost:5173`
   - Backend runs on `http://localhost:8000`

2. **Production Mode**:
   - If `VITE_API_URL` is set, axios uses that as baseURL
   - If empty, axios uses `/api` (relative path for same-origin requests)
   - Frontend is built to `backend/public` and served by the backend server

## Quick Start

1. For development, you typically don't need a `.env` file (proxy is configured)
2. If you need to connect to a different backend URL:
   ```bash
   cd frontend
   # Create .env file
   echo "VITE_API_URL=http://localhost:8000" > .env
   ```

3. Make sure `.env` is in your `.gitignore` (should already be there)

## Notes

- All Vite environment variables must be prefixed with `VITE_`
- Environment variables are embedded at build time
- Changes to `.env` require restarting the dev server
- The frontend API client (`src/lib/api.js`) automatically handles the configuration

