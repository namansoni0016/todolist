import express from "express";
import { getAllUsers, registerUser, getUserDetails } from "../controllers/user.js";

const router = express.Router();

router.get("/", getAllUsers);

router.post("/new", registerUser);

router.get("/:id", getUserDetails);

export default router;