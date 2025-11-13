import Donor from "../models/donorModel.js";
import Hospital from "../models/hospitalModel.js";

export async function search(req, res) {
  const { q, bloodGroup, location } = req.query;
  const donorFilter = {};
  if (bloodGroup) donorFilter.bloodGroup = bloodGroup;
  if (location) donorFilter.location = new RegExp(location, "i");
  if (q) donorFilter.$or = [{ location: new RegExp(q, "i") }];

  const hospitalFilter = {};
  if (q) hospitalFilter.$or = [{ name: new RegExp(q, "i") }, { address: new RegExp(q, "i") }];

  const [donors, hospitals] = await Promise.all([
    Donor.find(donorFilter).limit(25),
    Hospital.find(hospitalFilter).limit(25),
  ]);
  res.json({ donors, hospitals });
}

