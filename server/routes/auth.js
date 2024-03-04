import { Router } from "express";
import User from '../models/user.js';
import bcrypt from 'bcrypt';

const router = Router();

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    
    try {
        if (!username || !email || !password) {
            return res.status(400).json({ message: '❌ Username, email, and password are required!' });
        }

        const existingUser = await User.findOne({ $or: [{ username }, { email }] });
        if (existingUser) {
            return res.status(400).json({ message: '❌ Username or email already exists.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const newUser = new User({
            username: username,
            email: email,
            password: hashedPassword,
        });
        const user = await newUser.save();
        res.status(200).json({ message: '✅ User created successfully.', User: user });
    }
    catch(err) {
        res.status(500).json(err.message);
    }
})

export default router;