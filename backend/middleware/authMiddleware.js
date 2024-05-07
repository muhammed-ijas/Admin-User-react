import jwt from "jsonwebtoken";
import expressAsyncHandler from "express-async-handler";
import { User } from '../models/userModel.js'
import Admin from "../models/adminModel.js";

const protect = expressAsyncHandler(async (req, res, next) => {
    let token = req.cookies.jwt
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = await User.findById(decoded.userId).select('-password')
            next();
        } catch (error) {
            console.log(error);
            res.status(401);
            throw new Error('Not authorized, invalid token');
        }

    } else {
        res.status(401);
        throw new Error('Not authorized, no token');
    }
})


const adminProtect = expressAsyncHandler(async (req, res, next) => {
    let token;
    token = req.cookies.admin;
    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.admin = await Admin.findById(decoded.adminId).select("-password");
            next();
        } catch (error) {
            res.status(401);
            throw new Error("Not authorized, invalid token");
        }
    } else {
        res.status(401);
        throw new Error("Not authorized, no token");
    }
});



export {
    protect,
    adminProtect
}