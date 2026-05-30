const express = require("express")
const router = express.Router()
const User = require("../models/User")
const authMiddleware = require("../middleware/authMiddleware")

router.get("/", authMiddleware, async (req, res) => {

  const users = await User.find()

  res.json(users)
})

router.delete("/:id", authMiddleware, async (req, res) => {

  await User.findByIdAndDelete(req.params.id)

  res.json({
    message: "Employee deleted"
  })
})

module.exports = router