import mongoose from "mongoose";

/**
 * @swagger
 * components:
 *   models:
 *     post:
 *       type: object
 *       required:
 *         - title
 *         - body
 *         - username
 *         - categories
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the post
 *         title:
 *           type: string
 *           description: The title of your post
 *         photo:
 *           type: string
 *           description: The url of the image
 *         username:
 *           type: string
 *           description: The author of the post
 *          categories:
 *          type: Array
 *          description: The involved categories of the post
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was added
 *       example:
 *         id: d5fE_asz
 *         title: My journey to TCS
 *         photo: sye7wyei
 *         username: Harsh
 *         categories: ['TCS','Eectronics']
 *         createdAt: 2020-03-10T04:05:06.157Z
 */

const postSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    photo: {
        type: String,
        required: false,
    },
    username: {
        type: String,
        required: true,
    },
    categories: {
        type: Array,
        required: true,
    },
    },
    {
         timestamps: true
    }   
    
);

const Post = mongoose.model('Post' , postSchema, 'Post');
export default Post; 