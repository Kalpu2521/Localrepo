import Emergency from "../models/emergencyModel.js";

export async function createEmergency(req, res) {
  const emergency = await Emergency.create({ ...req.body, requester: req.user.id });
  res.status(201).json(emergency);
}

export async function getEmergencies(req, res) {
  const emergencies = await Emergency.find().populate("requester", "name email");
  res.json(emergencies);
}

export async function getEmergencyById(req, res) {
  const emergency = await Emergency.findById(req.params.id).populate("requester", "name email");
  if (!emergency) return res.status(404).json({ message: "Emergency not found" });
  res.json(emergency);
}

export async function updateEmergency(req, res) {
  const emergency = await Emergency.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!emergency) return res.status(404).json({ message: "Emergency not found" });
  res.json(emergency);
}

export async function deleteEmergency(req, res) {
  const emergency = await Emergency.findByIdAndDelete(req.params.id);
  if (!emergency) return res.status(404).json({ message: "Emergency not found" });
  res.json({ message: "Emergency deleted" });
}

