# Backend Signup/Registration Logic Guide

This document describes the enhanced backend signup logic implemented for the Smart Blood Donation System.

## Overview

The registration system has been enhanced with comprehensive validation, error handling, and security improvements.

## Components

### 1. Validation Middleware (`middleware/validationMiddleware.js`)

**Purpose**: Validates and sanitizes input before it reaches the controller.

**Features**:
- Email format validation
- Password strength requirements (minimum 6 characters)
- Name validation (2-100 characters, letters/spaces/hyphens/apostrophes only)
- Role validation (must be one of: admin, donor, hospital, recipient)
- Input sanitization (trim, lowercase email)
- Detailed error messages

**Usage**:
```javascript
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);
```

### 2. Enhanced Register Controller (`controllers/authController.js`)

**Features**:
- Comprehensive error handling with try-catch blocks
- Duplicate email detection
- MongoDB validation error handling
- Password hashing with bcrypt (10 rounds)
- JWT token generation
- Structured error responses with error codes

**Response Format**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

**Error Responses**:
- `400` - Validation failed (with detailed errors array)
- `409` - Email already registered
- `500` - Internal server error

### 3. Enhanced User Model (`models/userModel.js`)

**Features**:
- Schema-level validation
- Email format validation
- Name length and character validation
- Role enum validation
- Automatic passwordHash exclusion in JSON responses
- Timestamps (createdAt, updatedAt)

**Validation Rules**:
- Name: 2-100 characters, letters/spaces/hyphens/apostrophes only
- Email: Valid email format, max 255 characters, unique, lowercase
- Password: Hashed with bcrypt (handled in controller)
- Role: Must be one of: admin, donor, hospital, recipient (default: recipient)

### 4. Enhanced Login Controller

**Features**:
- Improved error handling
- Consistent error response format
- Password verification
- JWT token generation

## API Endpoints

### POST /api/auth/register

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123",
  "role": "donor"
}
```

**Success Response (201)**:
```json
{
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

**Error Responses**:

**400 - Validation Failed**:
```json
{
  "message": "Validation failed",
  "errors": [
    "Name must be at least 2 characters long",
    "Invalid email format",
    "Password must be at least 6 characters long"
  ]
}
```

**409 - Email Already Exists**:
```json
{
  "message": "Email already registered",
  "error": "EMAIL_EXISTS"
}
```

**500 - Internal Server Error**:
```json
{
  "message": "Registration failed. Please try again later.",
  "error": "INTERNAL_ERROR"
}
```

### POST /api/auth/login

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success Response (200)**:
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "donor"
  }
}
```

**Error Responses**:

**400 - Validation Failed**:
```json
{
  "message": "Validation failed",
  "errors": [
    "Email is required",
    "Invalid email format"
  ]
}
```

**401 - Invalid Credentials**:
```json
{
  "message": "Invalid credentials",
  "error": "INVALID_CREDENTIALS"
}
```

## Security Features

1. **Password Hashing**: All passwords are hashed using bcrypt with 10 salt rounds
2. **Input Sanitization**: All inputs are trimmed and normalized
3. **Email Normalization**: Emails are converted to lowercase
4. **Password Exclusion**: Password hashes are never returned in API responses
5. **Rate Limiting**: Auth endpoints are protected by rate limiting (see `middleware/rateLimit.js`)
6. **Validation**: Multi-layer validation (middleware + model schema)

## Error Handling

All endpoints use consistent error handling:
- Try-catch blocks for async operations
- Specific error codes for different error types
- Detailed error messages for validation failures
- Generic messages for security (to prevent information leakage)
- Console logging for debugging (server-side only)

## Testing

To test the registration endpoint:

```bash
curl -X POST http://localhost:8000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "donor"
  }'
```

## Future Enhancements

Potential improvements:
- Email verification
- Password reset functionality
- Two-factor authentication
- Account activation/deactivation
- Password strength meter
- OAuth integration
- Account recovery options

