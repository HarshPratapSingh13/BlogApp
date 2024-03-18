import { Router } from "express";
import User from "../models/user.js";
import bcrypt from 'bcrypt';
import passwordSchema from "../middleware/passwordValidator.js";
import userRegistrationSchema from "../middleware/validator.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/user/getAllUsers:
 *   get:
 *     description: Gives a list of all the users .
 *     responses:
 *       200:
 *         description: Returns list of all the users in json format
 *       500:
 *         description: Internal server error
 */

router.get("/getAllUsers", async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/user/getUserById:
 *   get:
 *     description: Returns User from user id.
 *     responses:
 *       200:
 *         description: Returns User in json format. 
 *       500:
 *         description: Internal server error
 */
router.get("/getUserbyId", async (req, res) => {
    try {
        const id = req.query.id;
        const user = await User.findById(id);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/user/createUser:
 *   post:
 *     description: Creates a new User.
 *     responses:
 *       200:
 *         description: User created successfully
 *       400 :
 *         description: Username or emal alreaddy exists.
 *       500:
 *         description: Internal server error
 */
router.post("/createUser", async (req, res) => {
    
    try {

        const { username, email, password } = userRegistrationSchema.parse(req.body);

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
        res.status(500).json({"errors": err.errors});
    }
});

/**
 * @swagger
 * /api/user/updateUser:
 *   put:
 *     description: Update a User from userid.
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401 :
 *         description: Unathorized attempt.
 *       404 :
 *         description: User not found.
 *       402 :
 *         description: Old and new passwords are same.
 *       500:
 *         description: Internal server error
 */

router.put('/updateUser', verifyToken, async (req, res) => {

    const id = req.userId;
    const { password } = req.body;

    try {
        if (!id) {
            return res.status(401).json({ message: '❌ Unauthorized' });
        }

        // Retrieve the user by id
        const user = await User.findById(id);

        if (!user) {
            return res.status(404).json({ message: '❌ User not found' });
        }

        // Update the user properties if provided in the request body
        if (password) {
            passwordSchema.parse(password);

            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                return res.status(402).json({ message: '❌ New password and old password is same.' });
            }

            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
        }

        await user.save();

        res.status(200).json({ message: '✅ User updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: error.errors });
    }
});

/**
 * @swagger
 * /api/user/deleteUser:
 *   delete:
 *     description: Delete a User from userid.
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401 :
 *         description: Unathorized attempt.
 *       404 :
 *         description: User not found.
 *       500:
 *         description: Internal server error
 */

router.delete("/deleteUser", verifyToken, async (req, res) => {
    try {
        const userId = req.userId;
        if (!userId) {
            return res.status(401).json({ message: '❌ Unauthorized' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: '❌ User not found' });
        }

        await User.deleteOne({ _id: userId });

        res.status(200).json({ message: '✅ User deleted successfully', deletedUser: user });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


export default router;