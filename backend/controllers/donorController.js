import Donor from "../models/donorModel.js";

export async function createDonor(req, res) {
  const donor = await Donor.create({ ...req.body, user: req.user.id });
  res.status(201).json(donor);
}

export async function getDonors(req, res) {
  const donors = await Donor.find().populate("user", "name email");
  res.json(donors);
}

export async function getDonorById(req, res) {
  const donor = await Donor.findById(req.params.id).populate("user", "name email");
  if (!donor) return res.status(404).json({ message: "Donor not found" });
  res.json(donor);
}

export async function updateDonor(req, res) {
  const donor = await Donor.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!donor) return res.status(404).json({ message: "Donor not found" });
  res.json(donor);
}

export async function deleteDonor(req, res) {
  const donor = await Donor.findByIdAndDelete(req.params.id);
  if (!donor) return res.status(404).json({ message: "Donor not found" });
  res.json({ message: "Donor deleted" });
}

export async function getMyDonorProfile(req, res) {
  try {
    const donor = await Donor.findOne({ user: req.user.id }).populate("user", "name email");
    if (!donor) {
      return res.status(404).json({ message: "Donor profile not found. Please create your donor profile first." });
    }
    res.json(donor);
  } catch (error) {
    console.error("Get my donor profile error:", error);
    res.status(500).json({ message: "Failed to retrieve donor profile" });
  }
}

