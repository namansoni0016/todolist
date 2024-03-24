import express from "express";
import userRouter from "./routes/user.js";
import taskRouter from "./routes/task.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";

const app = express();

config({
    path: ".env"
});

connectDB();

//Middlewares
app.use(express.json());
app.use(cookieParser());

//Using routes
app.use("/users", userRouter);
app.use("/tasks", taskRouter);

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
    console.log("Server running on port 4000");
})