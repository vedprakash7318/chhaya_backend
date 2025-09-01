const express = require("express");
const router = express.Router();
const { addOption } = require("../Controller/OptionController");

// POST /api/options/add
router.post("/add", addOption);

module.exports = router;
