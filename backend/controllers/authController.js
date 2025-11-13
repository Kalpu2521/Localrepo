import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/userModel.js";

function signToken(user) {
  const payload = { id: user._id, role: user.role, name: user.name };
  const secret = process.env.JWT_SECRET || "dev_secret_change_me";
  const expiresIn = process.env.JWT_EXPIRES_IN || "7d";
  return jwt.sign(payload, secret, { expiresIn });
}

export async function register(req, res) {
  try {
    const { name, email, password, role } = req.body;

    // Check if user already exists (double-check, validation middleware should catch most cases)
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ 
        message: "Email already registered",
        error: "EMAIL_EXISTS"
      });
    }

    // Hash password
    const passwordHash = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({ 
      name, 
      email, 
      passwordHash, 
      role: role || 'recipient' 
    });

    // Generate token
    const token = signToken(user);

    // Return success response
    res.status(201).json({ 
      message: "User registered successfully",
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Handle duplicate key error (MongoDB unique constraint)
    if (error.code === 11000) {
      return res.status(409).json({ 
        message: "Email already registered",
        error: "EMAIL_EXISTS"
      });
    }

    // Handle validation errors from Mongoose
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({ 
        message: "Validation failed",
        errors: errors
      });
    }

    // Generic error
    res.status(500).json({ 
      message: "Registration failed. Please try again later.",
      error: "INTERNAL_ERROR"
    });
  }
}

export async function login(req, res) {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ 
        message: "Invalid credentials",
        error: "INVALID_CREDENTIALS"
      });
    }

    // Verify password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        message: "Invalid credentials",
        error: "INVALID_CREDENTIALS"
      });
    }

    // Generate token
    const token = signToken(user);

    // Return success response
    res.json({ 
      message: "Login successful",
      token, 
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ 
      message: "Login failed. Please try again later.",
      error: "INTERNAL_ERROR"
    });
  }
}

export async function me(req, res) {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) {
      return res.status(404).json({ 
        message: "User not found",
        error: "USER_NOT_FOUND"
      });
    }
    res.json({ user });
  } catch (error) {
    console.error("Get user error:", error);
    res.status(500).json({ 
      message: "Failed to retrieve user information",
      error: "INTERNAL_ERROR"
    });
  }
}

