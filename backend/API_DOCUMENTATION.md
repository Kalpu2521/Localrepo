# Smart Blood Donation API Documentation

## Base URL
```
http://localhost:5000/api
```

## Authentication

Most endpoints require authentication via JWT token. Include the token in the Authorization header:
```
Authorization: Bearer <your_jwt_token>
```

### User Roles
- `admin` - System administrator
- `donor` - Blood donor
- `hospital` - Hospital staff
- `recipient` - Blood recipient

---

## Health Check

### GET /health
Check if the server is running.

**Response:**
```json
{
  "ok": true,
  "service": "smart-blood-donation",
  "timestamp": 1234567890123
}
```

---

## Authentication Routes (`/api/auth`)

### POST /api/auth/register
Register a new user account.

**Rate Limited:** Yes (authLimiter)

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "donor"  // Optional: "admin" | "donor" | "hospital" | "recipient" (default: "recipient")
}
```

**Response (201 Created):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

**Error Responses:**
- `400` - Missing required fields
- `409` - Email already registered

---

### POST /api/auth/login
Authenticate user and receive JWT token.

**Rate Limited:** Yes (authLimiter)

**Request Body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response (200 OK):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

**Error Responses:**
- `401` - Invalid credentials

---

### GET /api/auth/me
Get current authenticated user's information.

**Authentication:** Required

**Response (200 OK):**
```json
{
  "user": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `404` - User not found

---

## Donor Routes (`/api/donors`)

### GET /api/donors
Get all donors.

**Authentication:** Not required

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "bloodGroup": "O+",
    "lastDonationDate": "2024-01-15T00:00:00.000Z",
    "availability": true,
    "location": "New York, NY",
    "phone": "+1234567890",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /api/donors/:id
Get a specific donor by ID.

**Authentication:** Not required

**URL Parameters:**
- `id` - Donor ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "bloodGroup": "O+",
  "lastDonationDate": "2024-01-15T00:00:00.000Z",
  "availability": true,
  "location": "New York, NY",
  "phone": "+1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404` - Donor not found

---

### POST /api/donors
Create a new donor profile.

**Authentication:** Required
**Required Role:** `donor` or `admin`

**Request Body:**
```json
{
  "bloodGroup": "O+",  // Required: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  "lastDonationDate": "2024-01-15T00:00:00.000Z",  // Optional: ISO date string
  "availability": true,  // Optional: boolean (default: true)
  "location": "New York, NY",  // Optional: string
  "phone": "+1234567890"  // Optional: string
}
```

**Note:** The `user` field is automatically set to the authenticated user's ID.

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": "507f1f77bcf86cd799439012",
  "bloodGroup": "O+",
  "lastDonationDate": "2024-01-15T00:00:00.000Z",
  "availability": true,
  "location": "New York, NY",
  "phone": "+1234567890",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not donor or admin)

---

### PUT /api/donors/:id
Update a donor profile.

**Authentication:** Required
**Required Role:** `donor` or `admin`

**URL Parameters:**
- `id` - Donor ID (MongoDB ObjectId)

**Request Body:** (All fields optional)
```json
{
  "bloodGroup": "A+",
  "lastDonationDate": "2024-02-01T00:00:00.000Z",
  "availability": false,
  "location": "Los Angeles, CA",
  "phone": "+1987654321"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": "507f1f77bcf86cd799439012",
  "bloodGroup": "A+",
  "lastDonationDate": "2024-02-01T00:00:00.000Z",
  "availability": false,
  "location": "Los Angeles, CA",
  "phone": "+1987654321",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-02-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions
- `404` - Donor not found

---

### DELETE /api/donors/:id
Delete a donor profile.

**Authentication:** Required
**Required Role:** `admin`

**URL Parameters:**
- `id` - Donor ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "message": "Donor deleted"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not admin)
- `404` - Donor not found

---

## Hospital Routes (`/api/hospitals`)

### GET /api/hospitals
Get all hospitals.

**Authentication:** Not required

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "name": "City General Hospital",
    "address": "123 Main St, New York, NY 10001",
    "phone": "+1234567890",
    "email": "contact@cityhospital.com",
    "managedBy": "507f1f77bcf86cd799439012",
    "bloodStock": {
      "A+": 50,
      "A-": 30,
      "B+": 45,
      "B-": 25,
      "AB+": 20,
      "AB-": 15,
      "O+": 100,
      "O-": 60
    },
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /api/hospitals/:id
Get a specific hospital by ID.

**Authentication:** Not required

**URL Parameters:**
- `id` - Hospital ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "City General Hospital",
  "address": "123 Main St, New York, NY 10001",
  "phone": "+1234567890",
  "email": "contact@cityhospital.com",
  "managedBy": "507f1f77bcf86cd799439012",
  "bloodStock": {
    "A+": 50,
    "A-": 30,
    "B+": 45,
    "B-": 25,
    "AB+": 20,
    "AB-": 15,
    "O+": 100,
    "O-": 60
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404` - Hospital not found

---

### POST /api/hospitals
Create a new hospital profile.

**Authentication:** Required
**Required Role:** `hospital` or `admin`

**Request Body:**
```json
{
  "name": "City General Hospital",  // Required: string
  "address": "123 Main St, New York, NY 10001",  // Optional: string
  "phone": "+1234567890",  // Optional: string
  "email": "contact@cityhospital.com",  // Optional: string (lowercase)
  "bloodStock": {  // Optional: object with blood group quantities
    "A+": 50,
    "A-": 30,
    "B+": 45,
    "B-": 25,
    "AB+": 20,
    "AB-": 15,
    "O+": 100,
    "O-": 60
  }
}
```

**Note:** The `managedBy` field is automatically set to the authenticated user's ID.

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "City General Hospital",
  "address": "123 Main St, New York, NY 10001",
  "phone": "+1234567890",
  "email": "contact@cityhospital.com",
  "managedBy": "507f1f77bcf86cd799439012",
  "bloodStock": {
    "A+": 50,
    "A-": 30,
    "B+": 45,
    "B-": 25,
    "AB+": 20,
    "AB-": 15,
    "O+": 100,
    "O-": 60
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not hospital or admin)

---

### PUT /api/hospitals/:id
Update a hospital profile.

**Authentication:** Required
**Required Role:** `hospital` or `admin`

**URL Parameters:**
- `id` - Hospital ID (MongoDB ObjectId)

**Request Body:** (All fields optional)
```json
{
  "name": "Updated Hospital Name",
  "address": "456 New St, Los Angeles, CA 90001",
  "phone": "+1987654321",
  "email": "newemail@hospital.com",
  "bloodStock": {
    "A+": 75,
    "O+": 120
  }
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "name": "Updated Hospital Name",
  "address": "456 New St, Los Angeles, CA 90001",
  "phone": "+1987654321",
  "email": "newemail@hospital.com",
  "managedBy": "507f1f77bcf86cd799439012",
  "bloodStock": {
    "A+": 75,
    "A-": 30,
    "B+": 45,
    "B-": 25,
    "AB+": 20,
    "AB-": 15,
    "O+": 120,
    "O-": 60
  },
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-02-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions
- `404` - Hospital not found

---

### DELETE /api/hospitals/:id
Delete a hospital profile.

**Authentication:** Required
**Required Role:** `admin`

**URL Parameters:**
- `id` - Hospital ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "message": "Hospital deleted"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not admin)
- `404` - Hospital not found

---

## Recipient Routes (`/api/recipients`)

### GET /api/recipients
Get all recipients.

**Authentication:** Not required

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "user": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "Jane Doe",
      "email": "jane@example.com"
    },
    "requiredBloodGroup": "O+",
    "urgency": "high",
    "hospital": "507f1f77bcf86cd799439013",
    "notes": "Patient needs urgent blood transfusion",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /api/recipients/:id
Get a specific recipient by ID.

**Authentication:** Not required

**URL Parameters:**
- `id` - Recipient ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "Jane Doe",
    "email": "jane@example.com"
  },
  "requiredBloodGroup": "O+",
  "urgency": "high",
  "hospital": "507f1f77bcf86cd799439013",
  "notes": "Patient needs urgent blood transfusion",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404` - Recipient not found

---

### POST /api/recipients
Create a new recipient profile.

**Authentication:** Required
**Required Role:** `recipient` or `admin`

**Request Body:**
```json
{
  "requiredBloodGroup": "O+",  // Required: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  "urgency": "high",  // Optional: "low" | "medium" | "high" (default: "low")
  "hospital": "507f1f77bcf86cd799439013",  // Optional: Hospital ID (MongoDB ObjectId)
  "notes": "Patient needs urgent blood transfusion"  // Optional: string
}
```

**Note:** The `user` field is automatically set to the authenticated user's ID.

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": "507f1f77bcf86cd799439012",
  "requiredBloodGroup": "O+",
  "urgency": "high",
  "hospital": "507f1f77bcf86cd799439013",
  "notes": "Patient needs urgent blood transfusion",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not recipient or admin)

---

### PUT /api/recipients/:id
Update a recipient profile.

**Authentication:** Required
**Required Role:** `recipient` or `admin`

**URL Parameters:**
- `id` - Recipient ID (MongoDB ObjectId)

**Request Body:** (All fields optional)
```json
{
  "requiredBloodGroup": "A+",
  "urgency": "medium",
  "hospital": "507f1f77bcf86cd799439014",
  "notes": "Updated notes"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "user": "507f1f77bcf86cd799439012",
  "requiredBloodGroup": "A+",
  "urgency": "medium",
  "hospital": "507f1f77bcf86cd799439014",
  "notes": "Updated notes",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-02-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions
- `404` - Recipient not found

---

### DELETE /api/recipients/:id
Delete a recipient profile.

**Authentication:** Required
**Required Role:** `admin`

**URL Parameters:**
- `id` - Recipient ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "message": "Recipient deleted"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not admin)
- `404` - Recipient not found

---

## Emergency Routes (`/api/emergencies`)

### GET /api/emergencies
Get all emergency requests.

**Authentication:** Not required

**Response (200 OK):**
```json
[
  {
    "_id": "507f1f77bcf86cd799439011",
    "requester": {
      "_id": "507f1f77bcf86cd799439012",
      "name": "John Doe",
      "email": "john@example.com"
    },
    "bloodGroup": "O+",
    "description": "Urgent need for O+ blood",
    "location": "New York, NY",
    "status": "open",
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

---

### GET /api/emergencies/:id
Get a specific emergency request by ID.

**Authentication:** Not required

**URL Parameters:**
- `id` - Emergency ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "requester": {
    "_id": "507f1f77bcf86cd799439012",
    "name": "John Doe",
    "email": "john@example.com"
  },
  "bloodGroup": "O+",
  "description": "Urgent need for O+ blood",
  "location": "New York, NY",
  "status": "open",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `404` - Emergency not found

---

### POST /api/emergencies
Create a new emergency request.

**Authentication:** Required

**Request Body:**
```json
{
  "bloodGroup": "O+",  // Required: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-"
  "description": "Urgent need for O+ blood",  // Optional: string
  "location": "New York, NY",  // Optional: string
  "status": "open"  // Optional: "open" | "assigned" | "fulfilled" | "cancelled" (default: "open")
}
```

**Note:** The `requester` field is automatically set to the authenticated user's ID.

**Response (201 Created):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "requester": "507f1f77bcf86cd799439012",
  "bloodGroup": "O+",
  "description": "Urgent need for O+ blood",
  "location": "New York, NY",
  "status": "open",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token

---

### PUT /api/emergencies/:id
Update an emergency request.

**Authentication:** Required

**URL Parameters:**
- `id` - Emergency ID (MongoDB ObjectId)

**Request Body:** (All fields optional)
```json
{
  "bloodGroup": "A+",
  "description": "Updated description",
  "location": "Los Angeles, CA",
  "status": "assigned"
}
```

**Response (200 OK):**
```json
{
  "_id": "507f1f77bcf86cd799439011",
  "requester": "507f1f77bcf86cd799439012",
  "bloodGroup": "A+",
  "description": "Updated description",
  "location": "Los Angeles, CA",
  "status": "assigned",
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-02-01T00:00:00.000Z"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `404` - Emergency not found

---

### DELETE /api/emergencies/:id
Delete an emergency request.

**Authentication:** Required

**URL Parameters:**
- `id` - Emergency ID (MongoDB ObjectId)

**Response (200 OK):**
```json
{
  "message": "Emergency deleted"
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `404` - Emergency not found

---

## Admin Routes (`/api/admin`)

### GET /api/admin/stats
Get system statistics.

**Authentication:** Required
**Required Role:** `admin`

**Response (200 OK):**
```json
{
  "users": 150,
  "donors": 75,
  "hospitals": 10,
  "recipients": 50,
  "emergencies": 25
}
```

**Error Responses:**
- `401` - Missing or invalid token
- `403` - Insufficient permissions (not admin)

---

## Search Routes (`/api/search`)

### GET /api/search
Search for donors and hospitals.

**Authentication:** Not required

**Query Parameters:**
- `q` - Search query (searches in donor location, hospital name, and hospital address)
- `bloodGroup` - Filter donors by blood group (e.g., "O+", "A-")
- `location` - Filter donors by location (case-insensitive partial match)

**Example Requests:**
```
GET /api/search?q=New York
GET /api/search?bloodGroup=O+&location=NY
GET /api/search?bloodGroup=A+&q=hospital
```

**Response (200 OK):**
```json
{
  "donors": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "user": "507f1f77bcf86cd799439012",
      "bloodGroup": "O+",
      "location": "New York, NY",
      "availability": true,
      "phone": "+1234567890",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "hospitals": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "name": "City General Hospital",
      "address": "123 Main St, New York, NY 10001",
      "phone": "+1234567890",
      "email": "contact@cityhospital.com",
      "bloodStock": {
        "A+": 50,
        "A-": 30,
        "B+": 45,
        "B-": 25,
        "AB+": 20,
        "AB-": 15,
        "O+": 100,
        "O-": 60
      },
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

**Note:** Results are limited to 25 donors and 25 hospitals per request.

---

## Error Responses

All endpoints may return the following error responses:

### 400 Bad Request
```json
{
  "message": "Missing required fields"
}
```

### 401 Unauthorized
```json
{
  "message": "Missing token"
}
```
or
```json
{
  "message": "Invalid or expired token"
}
```
or
```json
{
  "message": "Invalid credentials"
}
```

### 403 Forbidden
```json
{
  "message": "Forbidden"
}
```

### 404 Not Found
```json
{
  "message": "API route not found"
}
```
or
```json
{
  "message": "Donor not found"
}
```
(Similar messages for other resources)

### 409 Conflict
```json
{
  "message": "Email already registered"
}
```

### 500 Internal Server Error
```json
{
  "message": "Server Error"
}
```

---

## Rate Limiting

- **Auth endpoints** (`/api/auth/*`): Protected by `authLimiter`
- **All other endpoints**: Protected by `generalLimiter`

Rate limit details are configured in `backend/middleware/rateLimit.js`.

---

## Data Models

### User
```typescript
{
  _id: ObjectId
  name: string (required)
  email: string (required, unique, lowercase)
  passwordHash: string (required)
  role: "admin" | "donor" | "hospital" | "recipient" (default: "recipient")
  createdAt: Date
  updatedAt: Date
}
```

### Donor
```typescript
{
  _id: ObjectId
  user: ObjectId (ref: User, required)
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" (required)
  lastDonationDate: Date (optional)
  availability: boolean (default: true)
  location: string (optional)
  phone: string (optional)
  createdAt: Date
  updatedAt: Date
}
```

### Hospital
```typescript
{
  _id: ObjectId
  name: string (required)
  address: string (optional)
  phone: string (optional)
  email: string (optional, lowercase)
  managedBy: ObjectId (ref: User, optional)
  bloodStock: {
    "A+": number (default: 0)
    "A-": number (default: 0)
    "B+": number (default: 0)
    "B-": number (default: 0)
    "AB+": number (default: 0)
    "AB-": number (default: 0)
    "O+": number (default: 0)
    "O-": number (default: 0)
  }
  createdAt: Date
  updatedAt: Date
}
```

### Recipient
```typescript
{
  _id: ObjectId
  user: ObjectId (ref: User, required)
  requiredBloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" (required)
  urgency: "low" | "medium" | "high" (default: "low")
  hospital: ObjectId (ref: Hospital, optional)
  notes: string (optional)
  createdAt: Date
  updatedAt: Date
}
```

### Emergency
```typescript
{
  _id: ObjectId
  requester: ObjectId (ref: User, required)
  bloodGroup: "A+" | "A-" | "B+" | "B-" | "AB+" | "AB-" | "O+" | "O-" (required)
  description: string (optional)
  location: string (optional)
  status: "open" | "assigned" | "fulfilled" | "cancelled" (default: "open")
  createdAt: Date
  updatedAt: Date
}
```

---

## Notes

1. All timestamps are in ISO 8601 format (UTC).
2. MongoDB ObjectIds are 24-character hexadecimal strings.
3. JWT tokens expire after 7 days by default (configurable via `JWT_EXPIRES_IN` environment variable).
4. The server serves static frontend files for non-API routes.
5. All endpoints support CORS (configurable via `CORS_ORIGIN` environment variable).
6. Request body size is limited to 1MB.
7. The server uses Helmet for security headers and Morgan for request logging.

