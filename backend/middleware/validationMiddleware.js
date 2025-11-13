/**
 * Validation middleware for user registration
 */

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password strength requirements:
// - At least 6 characters
// - At least one letter and one number (optional: can be simple for now)
const PASSWORD_MIN_LENGTH = 6;

// Valid roles
const VALID_ROLES = ['admin', 'donor', 'hospital', 'recipient'];

/**
 * Validates registration input
 */
export function validateRegister(req, res, next) {
  const { name, email, password, role } = req.body;
  const errors = [];

  // Validate name
  if (!name || typeof name !== 'string') {
    errors.push('Name is required and must be a string');
  } else {
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      errors.push('Name must be at least 2 characters long');
    }
    if (trimmedName.length > 100) {
      errors.push('Name must be less than 100 characters');
    }
    // Check for valid characters (letters, spaces, hyphens, apostrophes)
    if (!/^[a-zA-Z\s'-]+$/.test(trimmedName)) {
      errors.push('Name can only contain letters, spaces, hyphens, and apostrophes');
    }
  }

  // Validate email
  if (!email || typeof email !== 'string') {
    errors.push('Email is required and must be a string');
  } else {
    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('Invalid email format');
    }
    if (trimmedEmail.length > 255) {
      errors.push('Email must be less than 255 characters');
    }
  }

  // Validate password
  if (!password || typeof password !== 'string') {
    errors.push('Password is required and must be a string');
  } else {
    if (password.length < PASSWORD_MIN_LENGTH) {
      errors.push(`Password must be at least ${PASSWORD_MIN_LENGTH} characters long`);
    }
    if (password.length > 128) {
      errors.push('Password must be less than 128 characters');
    }
    // Optional: Check for at least one letter and one number
    // if (!/(?=.*[a-zA-Z])(?=.*\d)/.test(password)) {
    //   errors.push('Password must contain at least one letter and one number');
    // }
  }

  // Validate role (optional)
  if (role !== undefined) {
    if (typeof role !== 'string') {
      errors.push('Role must be a string');
    } else if (!VALID_ROLES.includes(role.toLowerCase())) {
      errors.push(`Role must be one of: ${VALID_ROLES.join(', ')}`);
    }
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  // Sanitize and normalize inputs
  req.body.name = req.body.name.trim();
  req.body.email = req.body.email.trim().toLowerCase();
  req.body.role = req.body.role ? req.body.role.toLowerCase() : 'recipient';

  next();
}

/**
 * Validates login input
 */
export function validateLogin(req, res, next) {
  const { email, password } = req.body;
  const errors = [];

  if (!email || typeof email !== 'string' || !email.trim()) {
    errors.push('Email is required');
  } else {
    const trimmedEmail = email.trim().toLowerCase();
    if (!EMAIL_REGEX.test(trimmedEmail)) {
      errors.push('Invalid email format');
    }
  }

  if (!password || typeof password !== 'string' || !password.trim()) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({
      message: 'Validation failed',
      errors: errors,
    });
  }

  // Sanitize email
  req.body.email = req.body.email.trim().toLowerCase();

  next();
}

