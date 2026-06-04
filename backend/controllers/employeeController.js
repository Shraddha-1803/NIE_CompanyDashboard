const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Get all employees
const getEmployees = async (req, res) => {
  try {

    const employees = await User.find()
      .select("-password");

    res.status(200).json(employees);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Get single employee
const getEmployee = async (req, res) => {
  try {

    const employee =
      await User.findById(req.params.id)
      .select("-password");

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Create employee
const createEmployee = async (req, res) => {
  try {
    const {
      name,
      email,
      department,
      role
    } = req.body;
    const existingUser =
      await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }
    const hashedPassword =
      await bcrypt.hash(
        "employee123",
        10 );
    const employee =
      await User.create({
        name,
        email,
        department,
        role,
        password: hashedPassword
      });
    res.status(201).json(employee);
  } catch (error) {










 console.log("CREATE EMPLOYEE ERROR:");
  console.log(error);

  res.status(500).json({
    message: error.message
  });







    // res.status(500).json({
    //   message: error.message
    // });
  }
};

// Update employee
const updateEmployee = async (req, res) => {

  try {

    const employee =
      await User.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true
        }
      );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json(employee);

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

// Delete employee
const deleteEmployee = async (req, res) => {

  try {

    const employee =
      await User.findByIdAndDelete(
        req.params.id
      );

    if (!employee) {
      return res.status(404).json({
        message: "Employee not found"
      });
    }

    res.status(200).json({
      message: "Employee deleted successfully"
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  getEmployees,
  getEmployee,
  createEmployee,
  updateEmployee,
  deleteEmployee
};