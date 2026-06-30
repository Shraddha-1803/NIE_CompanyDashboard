const express = require("express");
const router = express.Router();
const User = require("../models/User");
const {
    register,
    login,
    getProfile
} = require("../controllers/authController");
const authMiddleware =
require("../middleware/authMiddleware");
console.log("AUTH ROUTE CONNECTED");
// REGISTER
router.post(
    "/register",
    register
);
// LOGIN
router.post(
    "/login",
    login
);
// PROFILE
router.get(
    "/profile",
    authMiddleware,
    getProfile
);
// GET USERS FOR TASK ASSIGNMENT
router.get(
    "/users",
    async(req,res)=>{
        try{
            const users =
            await User.find()
            .select("-password");
            res.json(users);
        }
        catch(err){
            res.status(500).json({
                message:err.message
            });
        }
    }
);
module.exports = router;