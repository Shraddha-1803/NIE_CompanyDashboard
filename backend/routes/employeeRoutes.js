const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
} = require("../controllers/employeeController");

// Get all employees
router.get(
  "/",
  authMiddleware,
  getEmployees
);

// Get single employee
router.get(
  "/:id",
  authMiddleware,
  getEmployee
);

// Add employee
router.post(
  "/",
  authMiddleware,
  createEmployee
);

// Update employee
router.put(
  "/:id",
  authMiddleware,
  updateEmployee
);

// Delete employee
router.delete(
  "/:id",
  authMiddleware,
  deleteEmployee
);
module.exports = router;