// models/Job.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String },
  WorkTime: { type: String },
  salary: { type: Number },
  serviceCharge: { type: Number, required: true }, // take from client
  adminCharge: { type: Number, required: true },   // give to country
  lastDateToApply: { type: Date, required: true }, // Add this field
  isActive: { type: Boolean, default: true }, // Add this field for auto-deactivation

  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  createdAt: { type: Date, default: Date.now },
  jobAddedBy: { type: mongoose.Schema.Types.ObjectId, ref: "jobAddedByType", required: true },
  jobAddedByType: { type: String, enum: ['StaffHead', 'PreVisaOfficer'], required: true }
});

module.exports = mongoose.model("Job", JobSchema);
