import mongoose from "mongoose";

const emergencySchema = new mongoose.Schema(
  {
    requester: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    bloodGroup: { type: String, required: true, enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"] },
    description: { type: String, trim: true },
    location: { type: String, trim: true },
    status: { type: String, enum: ["open", "assigned", "fulfilled", "cancelled"], default: "open" }
  },
  { timestamps: true }
);

const Emergency = mongoose.model("Emergency", emergencySchema);
export default Emergency;

