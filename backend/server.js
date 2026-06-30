const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const dotenv = require("dotenv")
const projectRoutes = require("./routes/projectRoutes")
const notificationRoutes = require("./routes/notificationRoutes")
dotenv.config()
const app = express()
app.use(cors({
origin:
[
  "http://localhost:3000"
// "https://company-dashboard-frontend-q5bn.onrender.com"
],
methods:["GET","POST","PUT","DELETE"],
credentials:true
}))
app.use(express.json())
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch((err) => console.log(err))
app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/employees", require("./routes/employeeRoutes"))
app.use("/api/projects", require("./routes/projectRoutes"))
app.use("/api/tasks", require("./routes/taskRoutes"))
app.use("/api/activities", require("./routes/activityRoutes"))
app.use("/api/profile", require("./routes/profileRoutes"))
app.use("/api/notifications", notificationRoutes)
app.get("/", (req, res) => {
  res.send("API Running")
})
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})