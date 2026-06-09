const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find()
    .populate("assignedTo", "name")
    .populate("projectId", "name");
    res.json(tasks);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const task = new Task(req.body);
    const savedTask =
      await task.save();
    res.status(201).json(savedTask);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
router.put("/:id", async (req, res) => {
  try {
    const updatedTask =
      await Task.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    res.json(updatedTask);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(
      req.params.id
    );
    res.json({
      message:
        "Task deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
module.exports = router;