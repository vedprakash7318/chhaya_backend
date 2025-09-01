// controllers/jobController.js
const Job = require("../Models/JobModel");

// CREATE
exports.createJob = async (req, res) => {
  try {
    const { jobTitle, description, salary, serviceCharge, adminCharge, country ,WorkTime} = req.body;
    if (!country) {
      return res.status(400).json({ success: false, message: "Country is required" });
    }
    const job = new Job({ jobTitle, description, salary, serviceCharge, adminCharge, country,WorkTime });
    await job.save();
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// READ all
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find().populate("country", "countryName");
    res.json({ success: true, data: jobs });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ single
exports.getJobById = async (req, res) => {
  try {
    const job = await Job.findById(req.params.id).populate("country", "countryName");
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// get jobs by country
exports.getJobByCountry = async (req, res) => {
  try {
    const {countryId} = req.params;
    const job = await Job.find({country:countryId}).populate("country", "countryName");
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// UPDATE
exports.updateJob = async (req, res) => {
  try {
    const { jobTitle, description, salary, serviceCharge, adminCharge, country } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { jobTitle, description, salary, serviceCharge, adminCharge, country },
      { new: true }
    ).populate("country", "countryName");
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};


// DELETE
exports.deleteJob = async (req, res) => {
  try {
    const job = await Job.findByIdAndDelete(req.params.id);
    if (!job) return res.status(404).json({ success: false, message: "Job not found" });
    res.json({ success: true, message: "Job deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
