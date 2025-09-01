// routes/jobRoutes.js
const express = require("express");
const router = express.Router();
const jobController = require("../Controller/jobController");

router.post("/", jobController.createJob);
router.get("/", jobController.getJobs);
router.get("/country/:countryId", jobController.getJobByCountry);
router.get("/:id", jobController.getJobById);
router.put("/:id", jobController.updateJob);
router.delete("/:id", jobController.deleteJob);

module.exports = router;
