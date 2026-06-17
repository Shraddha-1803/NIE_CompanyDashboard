const express=require("express");
const router=express.Router();
const authMiddleware =
require("../middleware/authMiddleware");
const User=require("../models/User");
router.get(
"/",
authMiddleware,
async(req,res)=>{
console.log(req.user);
const user =
await User.findById(req.user.id)
.select("-password");
res.json(user);
});
module.exports=router;