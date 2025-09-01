// routes/countryRoutes.js
const express = require("express");
const router = express.Router();
const countryController = require("../Controller/countryController");

router.post("/", countryController.createCountry);       // Create country
router.get("/", countryController.getCountries);         // Get all countries
router.get("/:id", countryController.getCountryById);    // Get single country
router.put("/:id", countryController.updateCountry);     // Update country
router.delete("/:id", countryController.deleteCountry);  // Delete country

module.exports = router;
