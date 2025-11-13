import mongoose from "mongoose";

const donorSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, index: true },
    bloodGroup: { type: String, required: true, enum: ["A+","A-","B+","B-","AB+","AB-","O+","O-"] },
    lastDonationDate: { type: Date },
    availability: { type: Boolean, default: true },
    location: { type: String, trim: true },
    phone: { type: String, trim: true },
  },
  { timestamps: true }
);

const Donor = mongoose.model("Donor", donorSchema);
export default Donor;

