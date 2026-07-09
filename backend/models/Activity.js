const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema(
  {
    action: String,
    name: String,
    type: String,
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
    }
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model("Activity", activitySchema);