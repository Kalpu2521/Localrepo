import User from "../models/userModel.js";
import Donor from "../models/donorModel.js";
import Hospital from "../models/hospitalModel.js";
import Recipient from "../models/recipientModel.js";
import Emergency from "../models/emergencyModel.js";

export async function getStats(req, res) {
  const [users, donors, hospitals, recipients, emergencies] = await Promise.all([
    User.countDocuments(),
    Donor.countDocuments(),
    Hospital.countDocuments(),
    Recipient.countDocuments(),
    Emergency.countDocuments(),
  ]);
  res.json({ users, donors, hospitals, recipients, emergencies });
}

