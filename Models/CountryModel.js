// models/Country.js
const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  countryName: { type: String, required: true},
  createdAt: { type: Date, default: Date.now },
  countryAddedBy: { type: mongoose.Schema.Types.ObjectId, ref: "Admin", required: true },
});

module.exports = mongoose.model("Country", CountrySchema);
