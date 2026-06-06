const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
  res.json([]);
});

router.post("/", (req, res) => {
  res.json({
    message: "Project Created"
  });
});

module.exports = router;