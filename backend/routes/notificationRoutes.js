const express = require("express");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();
const {
  getNotifications,
  markAsRead,
} = require("../controllers/notificationController");
// router.get("/", getNotifications);
// router.put("/:id", markAsRead);
router.get(
    "/",
    authMiddleware,
    getNotifications
);
router.put(
    "/:id",
    authMiddleware,
    markAsRead
);
module.exports = router;