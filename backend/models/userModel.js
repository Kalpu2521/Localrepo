import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { 
      type: String, 
      required: [true, "Name is required"], 
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
      maxlength: [100, "Name must be less than 100 characters"],
      validate: {
        validator: function(v) {
          return /^[a-zA-Z\s'-]+$/.test(v);
        },
        message: "Name can only contain letters, spaces, hyphens, and apostrophes"
      }
    },
    email: { 
      type: String, 
      required: [true, "Email is required"], 
      unique: true, 
      lowercase: true, 
      trim: true,
      maxlength: [255, "Email must be less than 255 characters"],
      validate: {
        validator: function(v) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        },
        message: "Invalid email format"
      }
    },
    passwordHash: { 
      type: String, 
      required: [true, "Password hash is required"]
    },
    role: { 
      type: String, 
      enum: {
        values: ["admin", "donor", "hospital", "recipient"],
        message: "Role must be one of: admin, donor, hospital, recipient"
      }, 
      default: "recipient" 
    },
  },
  { 
    timestamps: true,
    toJSON: {
      transform: function(doc, ret) {
        delete ret.passwordHash;
        return ret;
      }
    }
  }
);

userSchema.methods.comparePassword = function comparePassword(plainText) {
  return bcrypt.compare(plainText, this.passwordHash);
};

const User = mongoose.model("User", userSchema);
export default User;

