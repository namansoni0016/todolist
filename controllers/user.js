import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";

export const getAllUsers = async (req, res) => {
    
};

export const loginUser = async(req, res) => {
    const { email, password} = req.body;
    const user = await User.findOne({email}).select("+password");
    if(!user) {
        return res.status(404).json({
            success: false,
            message: "Invalid user or password"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(404).json({
            success: false,
            message: "Invalid user or password"
        })
    }
    sendCookie(user, res, `Welcome back ${user.name}`, 201);
};

export const registerUser = async (req, res) => {
    const {name, email, password} = req.body;
    const user = await User.findOne({ email });
    if(user) {
        return res.status(404).json({
            success: false, 
            message: "User Already Exists",
        });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const createdUser = await User.create({name, email, password: hashedPassword});
    sendCookie(createdUser, res, "Registered Successfully", 201);
};

export const getMyDetails = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
};

export const logoutUser = (req, res) => {
    res.status(200).cookie("token", "", {expires:new Date(Date.now())}).json({
        success: true,
        user: req.user,
    })
}

