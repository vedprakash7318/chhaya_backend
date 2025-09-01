// models/Job.js
const mongoose = require("mongoose");

const JobSchema = new mongoose.Schema({
  jobTitle: { type: String, required: true },
  description: { type: String },
  WorkTime: { type: String },
  salary: { type: Number },
  serviceCharge: { type: Number, required: true }, // take from client
  adminCharge: { type: Number, required: true },   // give to country
  country: { type: mongoose.Schema.Types.ObjectId, ref: "Country", required: true },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Job", JobSchema);
