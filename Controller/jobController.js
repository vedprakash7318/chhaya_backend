// controllers/jobController.js
const Job = require("../Models/JobModel");

// CREATE
exports.createJob = async (req, res) => {
  try {
    const { jobTitle, description, salary, serviceCharge, adminCharge, country ,WorkTime,jobAddedBy,jobAddedByType,lastDateToApply} = req.body;
    if (!country) {
      return res.status(400).json({ success: false, message: "Country is required" });
    }
     if (!lastDateToApply) {
      return res.status(400).json({ success: false, message: "Last date to apply is required" });
    }
     const job = new Job({ 
      jobTitle, 
      description, 
      salary, 
      serviceCharge, 
      adminCharge, 
      country, 
      WorkTime, 
      jobAddedBy, 
      jobAddedByType, 
      lastDateToApply,
      isActive: new Date(lastDateToApply) > new Date() // Set active status based on date
    });
    await job.save();
    res.status(201).json({ success: true, data: job });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
 

// Add this function to automatically deactivate expired jobs
exports.deactivateExpiredJobs = async () => {
  try {
    const result = await Job.updateMany(
      { 
        lastDateToApply: { $lt: new Date() },
        isActive: true 
      },
      { 
        isActive: false 
      }
    );
    console.log(`Deactivated ${result.nModified} expired jobs`);
  } catch (error) {
    console.error("Error deactivating expired jobs:", error);
  }
};
// Schedule the job deactivation (run this once when server starts)
// You can use node-cron or setInterval to run this daily
setInterval(() => {
  exports.deactivateExpiredJobs();
}, 24 * 60 * 60 * 1000); 




// READ all
exports.getJobs = async (req, res) => {
  try {
    const jobAddedBy=req.params.jobAddedBy;
    const jobs = await Job.find({jobAddedBy:jobAddedBy}).populate("country", "countryName");
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
    const { jobTitle, description, salary, serviceCharge, adminCharge, country,lastDateToApply } = req.body;
    const job = await Job.findByIdAndUpdate(
      req.params.id,
      { jobTitle, description, salary, serviceCharge, adminCharge, country,lastDateToApply },
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
