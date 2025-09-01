const mongoose = require("mongoose");

const OptionsSchema = new mongoose.Schema({
  options: { type: mongoose.Schema.Types.ObjectId, ref: "Job", default:null},
  requestedBy:{ type: mongoose.Schema.Types.ObjectId, ref: "StaffHead", required: true },
  requestedTo: { type: mongoose.Schema.Types.ObjectId, ref: "PreVisaOfficer", required: true },
  formID:{ type: mongoose.Schema.Types.ObjectId, ref: "ClientForm", required: true },
  requestMessage:{type:String},
  responseMessage:{type:String},
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Options", OptionsSchema);
