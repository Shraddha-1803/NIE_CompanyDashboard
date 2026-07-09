const express = require("express");
const router = express.Router();
const Activity = require("../models/Activity");
const Project = require("../models/Project");
const User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");
router.get("/", authMiddleware, async (req, res) => {
    try {
        if (req.user.role === "admin") {
            const activities = await Activity.find()
                .sort({ createdAt: -1 })
                .limit(10);
            return res.json(activities);
        }
        const user = await User.findById(req.user.id);
        const projects = await Project.find({
            team: user.name
        });
        const projectIds = projects.map(project => project._id);
        const activities = await Activity.find({
            $or: [
                {
                    employeeId: user._id
                },
                {
                    projectId: {
                        $in: projectIds
                    }
                },
                {
                    createdBy: {
                        $ne: user._id
                    },
                    employeeId: user._id
                }
            ]
        })
        .sort({
            createdAt: -1
        })
        .limit(10);
        res.json(activities);
    }
    catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});
module.exports = router;