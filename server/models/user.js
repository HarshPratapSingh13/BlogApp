import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   models:
 *     user:
 *       type: object
 *       required:
 *         - username
 *         - email
 *         - password
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         username:
 *           type: string
 *           description: The username of author of your post
 *         password:
 *           type: string
 *           description: Login password 
 *         profilePic:
 *           type: string
 *           description: The url of profile image
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was added
 *       example:
 *         id: d5fE_asz
 *         username: Harsh
 *         email: hp@gmail.com
 *         password: skjfhksndc
 *         profilePic: sye7wyei
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const userSchema = new mongoose.Schema({
    
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profilePic: {
        type: String,
        default: "",
    },
    },
    { 
        timestamps: true
    }
);

const User = mongoose.model('User' , userSchema, 'User');
export default User;