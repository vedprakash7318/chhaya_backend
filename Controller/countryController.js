// controllers/countryController.js
const Country = require("../Models/CountryModel");

// CREATE
exports.createCountry = async (req, res) => {
  try {
    const { countryName, addedBy } = req.body;
    const country = new Country({ countryName, addedBy });
    await country.save();
    res.status(201).json({ success: true, data: country });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ (all countries)
exports.getCountries = async (req, res) => {
  try {
    const countries = await Country.find().sort({ createdAt: -1 });
    res.json({ success: true, data: countries });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// READ (single country)
exports.getCountryById = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (!country) return res.status(404).json({ success: false, message: "Country not found" });
    res.json({ success: true, data: country });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// UPDATE
exports.updateCountry = async (req, res) => {
  try {
    const { countryName } = req.body;
    const country = await Country.findByIdAndUpdate(
      req.params.id,
      { countryName },
      { new: true }
    );
    if (!country) return res.status(404).json({ success: false, message: "Country not found" });
    res.json({ success: true, data: country });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

// DELETE
exports.deleteCountry = async (req, res) => {
  try {
    const country = await Country.findByIdAndDelete(req.params.id);
    if (!country) return res.status(404).json({ success: false, message: "Country not found" });
    res.json({ success: true, message: "Country deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
