// routes/user.js
const express = require("express");
const router = express.Router();
const HistoryController = require("../controllers/HistoryController");

router.get("/", HistoryController.getAllHistory);

module.exports = router;
