const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: String,
  team: [
    {
      type: String
    }
  ],
  status: String,
  progress: Number
});
module.exports = mongoose.model(
  "Project",
  projectSchema
);