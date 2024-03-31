import { Router } from "express";
import Post from "../models/post.js";
import verifyToken from "../middleware/authMiddleware.js";
import postValidator from "../middleware/postValidator.js";

const router = Router();


/**
 * @swagger
 * /api/post/getAllPosts:
 *   get:
 *     description: Gives a list of all the posts .
 *     responses:
 *       200:
 *         description: Returns list of all the posts present in json format
 *       500:
 *         description: Internal server error
 */

router.get("/getAllPosts" , async (req, res) => {

    const username = req.query.username;
    const category = req.query.category;

    try {

        let posts;
        if (username) {
            posts = await Post.find({ username });
        }
        else if (category){
            posts = await Post.find({ categories : {
                $in: [category] , 
            },
        });
        }
        else{
            posts = await Post.find();
        }
        res.status(200).json(posts);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/post/getPostById:
 *   get:
 *     description: Returns Post from post id.
 *     responses:
 *       200:
 *         description: Returns Post in json format. 
 *       500:
 *         description: Internal server error
 */
router.get("/:id", async (req, res) => {
    try {
       // const id = req.query.id;
        const post = await Post.findById(req.params.id);
        res.json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/post/createPost:
 *   post:
 *     description: Creates a new post.
 *     responses:
 *       200:
 *         description: Post created successfully
 *       401 :
 *         description: Unathorized attempt.
 *       500:
 *         description: Internal server error
 */
router.post("/createPost", verifyToken, async (req, res) => {

    try {

        const username = req.username;
        if (!username) {
            return res.status(401).json({ message: '❌ Unauthorized' });
        }
        const { title, body, photo, categories } = req.body;
        postValidator.parse({ title, body });

        // const existingTitle = await Post.findOne({ $or: [{title: title}, {username: username}] });
        // if (existingTitle) {
        //     return res.status(400).json({ message: '❌ Title already exists.' });
        // }

        const newPost = new Post({
            title: title,
            body: body,
            photo: photo,
            username: username,
            categories: categories,
        });
        const post = await newPost.save();
        res.status(200).json({ message: '✅ Post created successfully.', Post: post });
    }
    catch(err) {
        res.status(500).json({"errors": err.errors});
    }

});

/**
 * @swagger
 * /api/post/updatePost:
 *   put:
 *     description: Update a post from postid.
 *     responses:
 *       200:
 *         description: Post updated successfully
 *       401 :
 *         description: Unathorized attempt.
 *       404 :
 *         description: Post not found.
 *       406 :
 *         description: You can ony change your post.
 *       500:
 *         description: Internal server error
 */
router.put("/updatePost", verifyToken, async (req, res) => {

    try {

        const username = req.username;
        const postId = req.query.id;
        const { title, body, photo, categories } = req.body;
        postValidator.parse({ title, body });

        if (!username) {
            return res.status(401).json({ message: '❌ Unauthorized' });
        }

        // Retrieve the post by id
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: '❌ Post not found' });
        }
        // A user can only change his own post
        if (post.username != username) {
            return res.status(406).json({ message: '❌ You can only change you own post' });
        }

        // Update the Post properties if provided in the request body
        post.title = title;
        post.body = body;
        post.photo = photo;
        post.categories = categories;

        await post.save();

        res.status(200).json({ message: '✅ Post updated successfully', newPost: post });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/post/deletePost:
 *   delete:
 *     description: Delete a post from postid.
 *     responses:
 *       200:
 *         description: Post deleted successfully
 *       401 :
 *         description: Unathorized attempt.
 *       404 :
 *         description: Post not found.
 *       406 :
 *         description: You can only delete your post.
 *       500:
 *         description: Internal server error
 */
router.delete("/deletePost", verifyToken,  async (req, res) => {

    try {

        const username = req.username;
        const postId = req.query.id;
        
        if (!username) {
            return res.status(401).json({ message: '❌ Unauthorized' });
        }

        // Retrieve the post by id
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ message: '❌ Post not found' });
        }
        // A user can only change his own post
        if (post.username != username) {
            return res.status(406).json({ message: '❌ You can only delete you own post' });
        }

        await post.deleteOne();

        res.status(200).json({ message: '✅ Post deleted successfully'  });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }    



});

export default router;