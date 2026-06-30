const express = require("express");
const router = express.Router();
const Task = require("../models/Task");
const Activity = require("../models/Activity");
const Notification = require("../models/Notification");
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
router.get(
"/",
authMiddleware,
async(req,res)=>{
try{
let tasks;
if(req.user.role === "admin"){
    tasks =
    await Task.find()
    .populate("assignedTo","name email")
    .populate("projectId","name");
}
else{
    tasks =
    await Task.find({
        assignedTo:req.user.id
    })
    .populate("assignedTo","name email")
    .populate("projectId","name");
}
res.json(tasks);
}catch(err){
res.status(500).json({
message:err.message
});
}
});
// router.post(
// "/",
// authMiddleware,
// roleMiddleware(["admin","employee"]),
// async(req,res)=>{
// try{
// const task = new Task({
// title:req.body.title,
// description:req.body.description,
// assignedTo:req.body.assignedTo,
// projectId:req.body.projectId,
// priority:req.body.priority,
// status:req.body.status
// });
router.post("/", authMiddleware, roleMiddleware(["admin","employee"]), async(req,res)=>{
  try{
    const assignedTo =
      req.user.role === "employee" ? req.user.id : req.body.assignedTo;
    const task = new Task({
      title: req.body.title,
      description: req.body.description,
      assignedTo,
      projectId: req.body.projectId,
      priority: req.body.priority,
      status: req.body.status
    });
const savedTask =
await task.save();
await Activity.create({
action:"Created Task",
name:savedTask.title,
type:"Task"
});
await Notification.create({
message:
`New task created: ${savedTask.title}`,
type:"task"
});
res.status(201).json(savedTask);
}catch(err){
res.status(500).json({
message:err.message
});
}
});
router.put(
"/:id",
authMiddleware,
async(req,res)=>{
try{
const task =
await Task.findById(
req.params.id
);
if(!task){
return res.status(404).json({
message:"Task not found"
});
}
if(req.user.role==="employee"){
    if(
    task.assignedTo.toString()
    !== req.user.id
    ){
        return res.status(403).json({
            message:
            "You can update only your assigned tasks"
        });
    }
    task.status =
    req.body.status;
}
else{
    task.title =
    req.body.title ?? task.title;
    task.description =
    req.body.description ?? task.description;
    task.assignedTo =
    req.body.assignedTo ?? task.assignedTo;
    task.projectId =
    req.body.projectId ?? task.projectId;
    task.priority =
    req.body.priority ?? task.priority;
    task.status =
    req.body.status ?? task.status;
}
const updatedTask =
await task.save();
await Activity.create({
action:
`Status changed to ${updatedTask.status}`,
name:
updatedTask.title,
type:
"Task"
});
await Notification.create({
message:
`Task ${updatedTask.title} updated to ${updatedTask.status}`,
type:
"task"
});
res.json(updatedTask);
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
const task =
await Task.findByIdAndDelete(
req.params.id
);
if(!task){
return res.status(404).json({
message:"Task not found"
});
}
await Activity.create({
action:"Deleted Task",
name:task.title,
type:"Task"
});
await Notification.create({
message:
`Task ${task.title} deleted`,
type:"task"
});
res.json({
message:
"Task deleted successfully"
});
}catch(err){
res.status(500).json({
message:err.message
});
}
});
module.exports = router;