import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import { sendCookie } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

export const loginUser = async(req, res) => {
    try {
        const { email, password} = req.body;
        const user = await User.findOne({email}).select("+password");
        if(!user) return next(new ErrorHandler("Invalid user or password", 400));
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) return next(new ErrorHandler("Invalid user or password", 400));
        sendCookie(user, res, `Welcome back ${user.name}`, 201);
    } catch (error) {
        next(error);
    }
};

export const registerUser = async (req, res) => {
    try {
        const {name, email, password} = req.body;
        const user = await User.findOne({ email });
        if(user) return next(new ErrorHandler("User already exist", 400));
        const hashedPassword = await bcrypt.hash(password, 10);
        const createdUser = await User.create({name, email, password: hashedPassword});
        sendCookie(createdUser, res, "Registered Successfully", 201);
    } catch (error) {
        next(error);
    }
};

export const getMyDetails = (req, res) => {
    res.status(200).json({
        success: true,
        user: req.user,
    })
};

export const logoutUser = (req, res) => {
    res.status(200).cookie("token", "", {expires:new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Developemnt" ? "Lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
    }).json({
        success: true,
        user: req.user,
        message: "Logged out!"
    })
}

