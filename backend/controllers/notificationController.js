const Notification = require("../models/Notification");
const User = require("../models/User");
const Project = require("../models/Project");
// const getNotifications = async (req, res) => {
//   try {
//     const notifications = await Notification.find()
//       .sort({ createdAt: -1 });
//     res.status(200).json(notifications);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };
const getNotifications = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);
        if (req.user.role === "admin") {
            const notifications = await Notification.find()
                .sort({ createdAt: -1 });
            return res.json(notifications);
        }
        const projects = await Project.find({
            team: user.name
        });
        const projectIds = projects.map(p => p._id);
        const notifications = await Notification.find({
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
        }).sort({
            createdAt: -1
        });
        res.json(notifications);
    }
    catch (err) {
        res.status(500).json({
           message: err.message
        });
    }
};
const markAsRead = async (req, res) => {
  try {
    await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true }
    );
    res.status(200).json({
      message: "Notification updated",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
module.exports = {
  getNotifications,
  markAsRead,
};