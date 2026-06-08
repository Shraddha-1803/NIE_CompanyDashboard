const mongoose = require("mongoose");
const projectSchema = new mongoose.Schema({
  name: String,
  team: String,
  lead: String,
  status: String,
  progress: Number
});
module.exports = mongoose.model(
  "Project",
  projectSchema
);