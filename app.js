import express from "express";
import mongoose from "mongoose";

const app = express();

//Middlewares
app.use(express.json());

mongoose.connect("mongodb://localhost:27017", {
    dbName: "todolist"
}).then(() => console.log("Database Connected"))
.catch((e) => console.log(e));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model("User", userSchema);

app.get("/", (req, res) => {
    res.send("Home Page");
})

app.get("/users", async (req, res) => {
    const users = await User.find({});
    res.json({
        success: true,
        users,
    })
})

app.post("/users/new", async (req, res) => {
    const { name, email, password } = req.body;
    await User.create({
        name,
        email,
        password
    });
    res.status(201).json({
        success: true,
        message: "Registered Successfully"
    })
});

app.get("/users/:id", async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.send(user);
})

app.listen(4000, () => {
    console.log("Server running on port 4000");
})