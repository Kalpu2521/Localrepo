import mongoose from "mongoose";

const recipientSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    requiredBloodGroup: { type: String, required: true, enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"] },
    urgency: { type: String, enum: ["low", "medium", "high"], default: "low" },
    hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },
    notes: { type: String, trim: true },
  },
  { timestamps: true }
);

const Recipient = mongoose.model("Recipient", recipientSchema);
export default Recipient;

