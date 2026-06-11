const Notification = require("../models/Notification");
const getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find()
      .sort({ createdAt: -1 });
    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
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