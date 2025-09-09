const Options = require("../Models/OptionsModel");
const ClientForm = require("../Models/ClientForm");
const Job = require("../Models/JobModel");




exports.addOption = async (req, res) => {
  try {
    const { options, staffheadId, preVisaOfficerId, formId, message, responseMessage } = req.body;
    // validation
    if (!staffheadId || !preVisaOfficerId || !formId || !message) {
      return res.status(400).json({ message: "requestedBy, requestedTo and formID are required" });
    }

    const newOption = new Options({
      options: options || null,
      requestedBy:staffheadId,
      requestedTo:preVisaOfficerId,
      formID:formId,
      requestMessage:message,
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



exports.getOptionsByFormId = async (req, res) => {
  try {
    const { formId } = req.params;

    if (!formId) {
      return res.status(400).json({ message: "formId is required" });
    }

    const options = await Options.find({ formID: formId })
      .populate("requestedBy") 
      .populate("requestedTo")
      .populate("options")
  .populate({
    path: "options",
    populate: { path: "country" }
  });

    if (!options || options.length === 0) { 
      return res.status(404).json({ message: "No options found for this formId" });
    }

    res.status(200).json({
      message: "Options fetched successfully",
      data: options,
    });
  } catch (error) {
    console.error("Error fetching options by formId:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


exports.getOptionsByRequestedTo = async (req, res) => {
  try {
    const { requestedTo } = req.params;

    if (!requestedTo) {
      return res.status(400).json({ message: "requestedTo is required" });
    }

    const options = await Options.find({ requestedTo })
      .populate("requestedBy")
      .populate("requestedTo")
      .populate("formID")
      .populate("options");

    if (!options || options.length === 0) {
      return res.status(404).json({ message: "No options found for this requestedTo" });
    }

    res.status(200).json({
      message: "Options fetched successfully",
      data: options,
    });
  } catch (error) {
    console.error("Error fetching options by requestedTo:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};


// exports.updateOption = async (req, res) => {
//   try {
//     const { id } = req.params; // param se _id aayega
//     const { options, responseMessage } = req.body;

//     if (!options && !responseMessage) {
//       return res.status(400).json({ message: "Options ya responseMessage required hai" });
//     }

//     const updatedOption = await Options.findByIdAndUpdate(
//       id,
//       {
//         ...(options && { options }),
//         ...(responseMessage && { responseMessage }),
//       },
//       { new: true }
//     );


//     if (!updatedOption) {
//       return res.status(404).json({ message: "Option not found" });
//     }

//     res.status(200).json({
//       message: "Option updated successfully",
//       data: updatedOption,
//     });
//   } catch (error) {
//     console.error("Error updating Option:", error);
//     res.status(500).json({ message: "Server Error", error: error.message });
//   }
// };




exports.updateOption = async (req, res) => {
  try {
    const { id } = req.params; // Option ka _id
    const { options, responseMessage } = req.body;

    if (!options && !responseMessage) {
      return res.status(400).json({ message: "Options ya responseMessage required hai" });
    }

    // Step 1: Update Option
    const updatedOption = await Options.findByIdAndUpdate(
      id,
      {
        ...(options && { options }),
        ...(responseMessage && { responseMessage }),
      },
      { new: true }
    );

    if (!updatedOption) {
      return res.status(404).json({ message: "Option not found" });
    }

    // Step 2: Agar jobId (options) diya gaya hai to Job fetch karo
    if (options) {
      const jobData = await Job.findById(options);
      if (!jobData) {
        return res.status(404).json({ message: "Job not found" });
      }

      // Step 3: ClientForm update karo (sirf selected fields overwrite honge)
      await ClientForm.findByIdAndUpdate(
        updatedOption.formID,
        {
          $set: {
            "officeConfirmation.country": jobData.country,
            "officeConfirmation.work": jobData._id,
            "officeConfirmation.salary": jobData.salary,
            "officeConfirmation.ServiceCharge": jobData.serviceCharge,
            // MedicalCharge ko touch nahi karenge
          },
        },
        { new: true }
      );
    }

    res.status(200).json({
      message: "Option updated successfully and ClientForm updated",
      data: updatedOption,
    });
  } catch (error) {
    console.error("Error updating Option:", error);
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
