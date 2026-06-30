const jwt = require("jsonwebtoken");
const User = require("../models/User");
const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                message: "No authorization header"
            });
        }
        const token = authHeader.split(" ")[1];
        if (!token) {
            return res.status(401).json({
                message: "Token missing"
            });
        }
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        // Get latest user details from database
        const user = await User.findById(decoded.id);
        if (!user) {
            return res.status(404).json({
                message:"User not found"
            });
        }
        // Store latest user information
        req.user = {
            id:user._id,
            name:user.name,
            email:user.email,
            role:user.role
        };
        next();
    } catch(error){
        console.log(error);
        return res.status(401).json({
            message:"Invalid token"
        });
    }
};
module.exports = authMiddleware;