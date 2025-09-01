const Options = require("../Models/OptionsModel");

exports.addOption = async (req, res) => {
  try {
    const { options, staffheadId, preVisaOfficerId, formId, requestMessage, responseMessage } = req.body;

    // validation
    if (!staffheadId || !preVisaOfficerId || !formId) {
      return res.status(400).json({ message: "requestedBy, requestedTo and formID are required" });
    }

    const newOption = new Options({
      options: options || null,
      requestedBy:staffheadId,
      requestedTo:preVisaOfficerId,
      formID:formId,
      requestMessage,
      responseMessage,
    });

    const savedOption = await newOption.save();

    res.status(201).json({
      message: "Option request created successfully",
      data: savedOption,
    });
  } catch (error) {
    console.error("Error adding Option:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
