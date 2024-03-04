import { Router } from "express";
import User from "../models/user.js";

const router = Router();

router.get("/", (req, res) => {
    res.send("Lele user");
});

router.post("/createUser", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: '❌ Username, email, and password are required!' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: '❌ Username or email already exists.' });
        }

        const newUser = new User({
            username,
            email,
            password,
        });

        // Save the user to the database
        await newUser.save();
        res.status(201).json({ message: '✅ User created successfully.', User: newUser });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

})

export default router;