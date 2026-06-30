const User = require("../models/User");
const bcrypt = require("bcryptjs");
const Notification = require("../models/Notification");
const Activity = require("../models/Activity");
const getEmployees = async (req, res) => {
    try {
        const employees = await User.find()
            .select("-password");
        res.status(200).json(employees);
    } catch (error) {
        res.status(500).json({
            message:error.message
        });
    }
};
const getEmployee = async(req,res)=>{
    try{
        const employee =
        await User.findById(req.params.id)
        .select("-password");
        if(!employee){
            return res.status(404).json({
                message:"Employee not found"
            });
        }
        res.status(200).json(employee);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const createEmployee = async(req,res)=>{
    try{
        const {
            name,
            email,
            department,
            role,
            team
        } = req.body;
        const existingUser =
        await User.findOne({email});
        if(existingUser){
            return res.status(400).json({
                message:"Email already exists"
            });
        }
        const hashedPassword =
        await bcrypt.hash(
            "employee123",
            10
        );
        const employee =
        await User.create({
            name,
            email,
            department,
            role: role || "employee",
            team,
            password:hashedPassword
        });
        await Notification.create({
            message:
            `${employee.name} was added as a new employee`,
            type:"employee"
        });
        await Activity.create({
            action:"Added Employee",
            name:employee.name,
            type:"Employee"
        });
        res.status(201).json(
            employee
        );
    }catch(error){
        console.log(
            "CREATE EMPLOYEE ERROR:",
            error
        );
        res.status(500).json({
            message:error.message
        });
    }
};
const updateEmployee = async(req,res)=>{
    try{
        const employee =
        await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new:true
            }
        );
        if(!employee){
            return res.status(404).json({
                message:"Employee not found"
            });
        }
        await Notification.create({
            message:
            `${employee.name} details were updated`,
            type:"activity"
        });
        await Activity.create({
            action:"Updated Employee",
            name:employee.name,
            type:"Employee"
        });
        res.status(200).json(employee);
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const deleteEmployee = async(req,res)=>{
    try{
        const employee =
        await User.findByIdAndDelete(
            req.params.id
        );
        if(!employee){
            return res.status(404).json({
                message:"Employee not found"
            });
        }
        await Activity.create({
            action:"Deleted Employee",
            name:employee.name,
            type:"Employee"
        });
        res.status(200).json({
            message:
            "Employee deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
const updateRole = async(req,res)=>{
    try{
        const {
            role
        } = req.body;
        if(
            role !== "admin" &&
            role !== "employee"
        ){
            return res.status(400).json({
                message:
                "Invalid role"
            });
        }
        const employee =
        await User.findByIdAndUpdate(
            req.params.id,
            {
                role
            },
            {
                new:true
            }
        );
        if(!employee){
            return res.status(404).json({
                message:
                "Employee not found"
            });
        }
        await Notification.create({
            message:
            `${employee.name} role changed to ${role}`,
            type:"activity"
        });
        await Activity.create({
            action:
            "Updated Employee Role",
            name:
            employee.name,
            type:
            "Employee"
        });
        res.status(200).json({
            message:
            "Role updated successfully",
            employee
        });
    }catch(error){
        res.status(500).json({
            message:error.message
        });
    }
};
module.exports = {
    getEmployees,
    getEmployee,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    updateRole
};