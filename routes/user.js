import express from "express";
import {
    registerUser, 
    getMyDetails,
    loginUser,
    logoutUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/new", registerUser);

router.post("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/me", isAuthenticated, getMyDetails);

export default router;