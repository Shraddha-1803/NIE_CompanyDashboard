const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
router.get("/", async (req, res) => {
  try {
    const projects = await Project.find();
    res.json(projects);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
router.post("/", async (req, res) => {
  try {
    const project = new Project({
      name: req.body.name,
      team: req.body.team,
      lead: req.body.lead,
      progress: req.body.progress,
      status: req.body.status
    });
    const savedProject =
      await project.save();
    res.status(201).json(
      savedProject
    );
    } catch (err) {
  console.log("PROJECT SAVE ERROR:", err);
  res.status(500).json({
    message: err.message
  });
}
});
router.put("/:id", async (req, res) => {
  try {
    const updatedProject =
      await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
    res.json(updatedProject);
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Project.findByIdAndDelete(
      req.params.id
    );
    res.json({
      message:
        "Project deleted successfully"
    });
  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
});
module.exports = router;