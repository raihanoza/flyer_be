// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const userController = require("../controllers/UserController");

router.post("/login", authController.login);
router.post("/register", userController.register);
router.post("/verify", userController.verify);
module.exports = router;
