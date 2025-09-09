const express = require("express");
const router = express.Router();
const { addOption,getOptionsByFormId,getOptionsByRequestedTo,updateOption } = require("../Controller/OptionController");

// POST /api/options/add
router.post("/add", addOption);

router.get("/optionGet/:formId", getOptionsByFormId);

router.get("/requestedTo/:requestedTo", getOptionsByRequestedTo);


router.put("/update/:id", updateOption);

module.exports = router;
