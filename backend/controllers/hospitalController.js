import Hospital from "../models/hospitalModel.js";

export async function createHospital(req, res) {
  const hospital = await Hospital.create({ ...req.body, managedBy: req.user.id });
  res.status(201).json(hospital);
}

export async function getHospitals(req, res) {
  const hospitals = await Hospital.find();
  res.json(hospitals);
}

export async function getHospitalById(req, res) {
  const hospital = await Hospital.findById(req.params.id);
  if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  res.json(hospital);
}

export async function updateHospital(req, res) {
  const hospital = await Hospital.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  res.json(hospital);
}

export async function deleteHospital(req, res) {
  const hospital = await Hospital.findByIdAndDelete(req.params.id);
  if (!hospital) return res.status(404).json({ message: "Hospital not found" });
  res.json({ message: "Hospital deleted" });
}

export async function getMyHospitalProfile(req, res) {
  try {
    const hospital = await Hospital.findOne({ managedBy: req.user.id });
    if (!hospital) {
      return res.status(404).json({ message: "Hospital profile not found. Please create your hospital profile first." });
    }
    res.json(hospital);
  } catch (error) {
    console.error("Get my hospital profile error:", error);
    res.status(500).json({ message: "Failed to retrieve hospital profile" });
  }
}

