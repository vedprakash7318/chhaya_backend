// models/Country.js
const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({
  countryName: { type: String, required: true, trim: true, unique: true },
  addedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, // optional
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Country", CountrySchema);
