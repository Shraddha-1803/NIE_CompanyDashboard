const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
  register,
  login,
  getProfile
} = require("../controllers/authController");
const authMiddleware = require("../middleware/authMiddleware");
router.post("/register", register);
router.post("/login", login);
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      { role: "employee" }
    ).select("name email department");
    res.json(users);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
module.exports = router;