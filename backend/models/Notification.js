const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema(
  {
    message: {
      type: String,
      required: true
    },
    type: {
      type: String,
      enum: ["project", "task", "employee", "activity"],
      required: true
    },
    employeeId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    projectId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
      default: null
    },
    taskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Task",
      default: null
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null
    },
    isRead: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Notification", notificationSchema);