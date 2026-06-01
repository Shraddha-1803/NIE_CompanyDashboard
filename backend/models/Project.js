const mongoose = require("mongoose")
const projectSchema = new mongoose.Schema({
  title: String,
  description: String,
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },
  teamMembers: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  }],
  deadline: Date
}, {
  timestamps: true
})
module.exports = mongoose.model(
  "Project",
  projectSchema
)