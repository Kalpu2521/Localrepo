# Backend Environment Variables Blueprint

Create a `.env` file in the `backend` directory with the following variables:

## Required Environment Variables

```env
# MongoDB Configuration
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0
MONGO_DB=blood_donation_db

# Server Configuration
PORT=8000
NODE_ENV=development

# CORS Configuration
# For development: use * or http://localhost:5173
# For production: specify your frontend domain (e.g., https://yourdomain.com)
CORS_ORIGIN=*

# JWT Configuration
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRES_IN=7d
```

## Variable Descriptions

### MONGO_URI

- **Required**: Yes
- **Description**: MongoDB connection string
- **Example**: `mongodb+srv://username:password@cluster.mongodb.net/?appName=Cluster0`
- **Default**: Hardcoded fallback in `config/db.js` (not recommended for production)

### MONGO_DB

- **Required**: No
- **Description**: Specific database name to use
- **Example**: `blood_donation_db`
- **Default**: Uses default database from connection string

### PORT

- **Required**: No
- **Description**: Port number for the backend server
- **Example**: `8000`
- **Default**: `5000` (but your server is running on 8000)

### NODE_ENV

- **Required**: No
- **Description**: Environment mode (development/production)
- **Options**: `development`, `production`
- **Default**: `development`
- **Impact**: Affects logging format (morgan)

### CORS_ORIGIN

- **Required**: No
- **Description**: Allowed origin for CORS requests
- **Development**: `*` or `http://localhost:5173`
- **Production**: Your frontend domain (e.g., `https://yourdomain.com`)
- **Default**: `*` (allows all origins)

### JWT_SECRET

- **Required**: Yes (for production)
- **Description**: Secret key for signing JWT tokens
- **Example**: Generate a strong random string
- **Default**: `dev_secret_change_me` (NOT secure for production)
- **Security**: Must be changed in production!

### JWT_EXPIRES_IN

- **Required**: No
- **Description**: JWT token expiration time
- **Example**: `7d`, `24h`, `1h`
- **Default**: `7d`

## Quick Start

1. Copy this blueprint to create your `.env` file:

   ```bash
   cd backend
   # Create .env file and fill in your values
   ```

2. Make sure `.env` is in your `.gitignore` (should already be there)

3. Update the values with your actual:
   - MongoDB connection string
   - Strong JWT secret (use a random generator)
   - Appropriate CORS origin for your setup

## Security Notes

- **Never commit `.env` files to version control**
- Use strong, random JWT secrets in production
- Restrict CORS_ORIGIN in production to your actual frontend domain
- Use environment-specific values for development vs production
