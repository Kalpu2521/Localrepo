import Recipient from "../models/recipientModel.js";

export async function createRecipient(req, res) {
  const recipient = await Recipient.create({ ...req.body, user: req.user.id });
  res.status(201).json(recipient);
}

export async function getRecipients(req, res) {
  const recipients = await Recipient.find().populate("user", "name email");
  res.json(recipients);
}

export async function getRecipientById(req, res) {
  const recipient = await Recipient.findById(req.params.id).populate("user", "name email");
  if (!recipient) return res.status(404).json({ message: "Recipient not found" });
  res.json(recipient);
}

export async function updateRecipient(req, res) {
  const recipient = await Recipient.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!recipient) return res.status(404).json({ message: "Recipient not found" });
  res.json(recipient);
}

export async function deleteRecipient(req, res) {
  const recipient = await Recipient.findByIdAndDelete(req.params.id);
  if (!recipient) return res.status(404).json({ message: "Recipient not found" });
  res.json({ message: "Recipient deleted" });
}

