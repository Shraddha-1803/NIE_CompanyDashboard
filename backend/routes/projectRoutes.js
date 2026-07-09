const express = require("express");
const router = express.Router();
const Project = require("../models/Project");
const Activity = require("../models/Activity");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get(
  "/",
  authMiddleware,
  roleMiddleware(["admin", "employee"]),
  async (req, res) => {
    try {
      if (req.user.role === "admin") {
        const projects = await Project.find();
        return res.json(projects);
      }
      const projects = await Project.find({
        team: req.user.name
      });
      res.json(projects);
    } catch (err) {
      res.status(500).json({
        message: err.message
      });
    }
  }
);
router.post(
    "/",
    authMiddleware,
    roleMiddleware(["admin","employee"]),
    async(req,res)=>{
    try{
        const project = new Project({
            name:req.body.name,
            team:req.body.team,
            progress:req.body.progress,
            status:req.body.status
        });
        const savedProject =
        await project.save();
        await Activity.create({
            action:"Created Project",
            name:savedProject.name,
            type:"Project",
            projectId: savedProject._id,
            createdBy: req.user.id
        });
        for (const member of savedProject.team) {
        const user = await require("../models/User").findOne({
            name: member
        });
    if (user) {
        await Notification.create({
            message: `${savedProject.name} project was created`,
            type:"project",
            employeeId: user._id,
            projectId: savedProject._id,
            createdBy: req.user.id
        });
    }
        }
        res.status(201).json( savedProject );
    }catch(err){
        console.log("PROJECT SAVE ERROR:", err );
        res.status(500).json({ message:err.message });
    }
});
router.put(
  "/:id",
  authMiddleware,
  async (req, res) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({
          message: "Project not found",
        });
      }
      if (req.user.role === "employee") {
        if (
          !Array.isArray(project.team) ||
          !project.team.includes(req.user.name)
        ) {
          return res.status(403).json({
            message: "You can update only your assigned projects",
          });
        }
        project.status = req.body.status;
        project.progress = req.body.progress;
      } else {
        project.name = req.body.name ?? project.name;
        project.team = req.body.team ?? project.team;
        project.progress = req.body.progress ?? project.progress;
        project.status = req.body.status ?? project.status;
      }
      const updatedProject = await project.save();
      await Activity.create({
        action: "Updated Project",
        name: updatedProject.name,
        type: "Project",
        projectId: updatedProject._id,
        createdBy: req.user.id
      });
      for (const member of updatedProject.team) {
      const user = await require("../models/User").findOne({
          name: member
      });
    if (user) {
      await Notification.create({
        message: `${updatedProject.name} project was updated`,
        type: "project",
        employeeId: user._id,
        projectId: updatedProject._id,
        createdBy: req.user.id
      });
    }
        }
      res.json(updatedProject);
    } catch (err) {
      console.log(err);
      res.status(500).json({
        message: err.message,
      });
    }
  }
);
router.delete(
    "/:id",
    authMiddleware,
    roleMiddleware(["admin"]),
    async(req,res)=>{
    try{
        const project = await Project.findByIdAndDelete(
            req.params.id
        );
        if(!project){
            return res.status(404).json({
            message:"Project not found"
            });
        }
        await Activity.create({
            action:"Deleted Project",
            name:project.name,
            type:"Project",
            projectId: project._id,
            createdBy: req.user.id
        });
        await Notification.create({
            message: `${project.name} project was deleted`,
            type:"project",
            employeeId: user._id,
            projectId: project._id,
            createdBy: req.user.id
        });
        res.json({ 
            message: "Project deleted successfully"
        });
    }catch(err){
        res.status(500).json({
            message:err.message
        });
    }
});    
module.exports = router;