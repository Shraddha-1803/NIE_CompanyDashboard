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
roleMiddleware(["admin","employee"]),
async(req,res)=>{
try{
const projects =
await Project.find();
res.json(projects);
}catch(err){
res.status(500).json({
message:err.message
});
}
});
router.post(
"/",
authMiddleware,
roleMiddleware(["admin","employee"]),
async(req,res)=>{
try{
const project = new Project({
name:req.body.name,
team:req.body.team,
lead:req.body.lead,
progress:req.body.progress,
status:req.body.status
});
const savedProject =
await project.save();
await Activity.create({
action:"Created Project",
name:savedProject.name,
type:"Project"
});
await Notification.create({
message:
`${savedProject.name} project was created`,
type:"project"
});
res.status(201).json(
savedProject
);
}catch(err){
console.log(
"PROJECT SAVE ERROR:",
err
);
res.status(500).json({
message:err.message
});
}
});
router.put(
"/:id",
authMiddleware,
roleMiddleware(["admin"]),
async(req,res)=>{
try{
const updatedProject =
await Project.findByIdAndUpdate(
req.params.id,
req.body,
{
new:true
}
);
if(!updatedProject){
return res.status(404).json({
message:"Project not found"
});
}
await Activity.create({
action:"Updated Project",
name:updatedProject.name,
type:"Project"
});
await Notification.create({
message:
`${updatedProject.name} project was updated`,
type:"project"
});
res.json(updatedProject);
}catch(err){
res.status(500).json({
message:err.message
});
}
});
router.delete(
"/:id",
authMiddleware,
roleMiddleware(["admin"]),
async(req,res)=>{
try{
const project =
await Project.findByIdAndDelete(
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
type:"Project"
});
await Notification.create({
message:
`${project.name} project was deleted`,
type:"project"
});
res.json({
message:
"Project deleted successfully"
});
}catch(err){
res.status(500).json({
message:err.message
});
}
});
module.exports = router;