// routes/user.js
const express = require("express");
const router = express.Router();
const AdminController = require("../controllers/AdminController");

router.get("/", AdminController.getAllUsers);
router.post("/", AdminController.createUser);
router.put("/:id", AdminController.updateUser);
router.delete("/:id", AdminController.deleteUser);

module.exports = router;
