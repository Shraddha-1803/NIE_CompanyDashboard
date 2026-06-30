const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const roleMiddleware = require("../middleware/roleMiddleware");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee,
  updateRole
} = require("../controllers/employeeController");
// View employees - everyone
router.get("/", authMiddleware, getEmployees);
router.get("/:id", authMiddleware, getEmployee);
// Add employee - admin only
router.post("/", authMiddleware, roleMiddleware(["admin"]), createEmployee);
// Update employee info - admin only
router.put("/:id", authMiddleware, roleMiddleware(["admin"]), updateEmployee);
// Update role - admin only (separate, explicit endpoint)
router.put("/:id/role", authMiddleware, roleMiddleware(["admin"]), updateRole);
// Delete - admin only
router.delete("/:id", authMiddleware, roleMiddleware(["admin"]), deleteEmployee);
module.exports = router;