const mongoose = require("mongoose");
const activitySchema = new mongoose.Schema(
  {
    action: String,
    name: String,
    type: String
  },
  {
    timestamps: true
  }
);
module.exports = mongoose.model(
  "Activity",
  activitySchema
);