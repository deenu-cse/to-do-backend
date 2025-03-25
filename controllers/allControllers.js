const { genToken } = require("../helpers/gentoken");
const Task = require("../models/taskModel");
const bcrypt = require('bcryptjs');
const { decodeToken } = require("../helpers/verifyToken");
const User = require("../models/userModels");

const SignUp = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, password } = req.body;
        if (!username || !email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: "User already exists." });
        }
        console.log("code is here ....");

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            username,
            email,
            password: hashedPassword,
        });

        const userToken = genToken(newUser._id, res);

        await newUser.save();

        return res.status(201).json({
            msg: "User registered successfully.",
            userToken,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}

const Login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ msg: "Please fill in all fields." });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: "User does not exist." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: "Invalid credentials." });
        }

        const userToken = genToken(user._id, res);

        return res.status(201).json({
            msg: "User registered successfully.",
            userToken,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}

const allTask = async (req, res) => {
    try {
        const tasks = await Task.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}

const addTask = async (req, res) => {
    try {
        const taskId = decodeToken(req.headers.authorization)
        const { title } = req.body;
        if (!title) return res.status(400).json({ error: "Title is required" });

        const newTask = await Task.create({
            title,
            taskId
        });
        res.status(201).json(newTask);
    } catch (error) {
        console.log(error);
        return res.status(500).json({ msg: error.message });
    }
}

const updateTask = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, completed } = req.body;

        const task = await Task.findOne({ _id: id });
        if (!task) return res.status(404).json({ error: "Task not found or unauthorized" });

        if (title) task.title = title;
        if (typeof completed !== "undefined") task.completed = completed;

        await task.save();
        res.status(200).json(task);
    } catch (error) {
        console.error("Error updating task:", error);
        res.status(500).json({ error: "Server error" });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        const deletedTask = await Task.findByIdAndDelete(id);

        if (!deletedTask) return res.status(404).json({ error: "Task not found" });

        res.status(200).json({ message: "Task deleted successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ error: "Server error" });
    }
}

module.exports = { SignUp, Login, allTask, addTask, updateTask, deleteTask }