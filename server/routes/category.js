import { Router } from "express";
import Category from "../models/category.js"

const router = Router();

/**
 * @swagger
 * /api/category/getAllCategories:
 *   get:
 *     description: Gives a list of all the categories present.
 *     responses:
 *       200:
 *         description: Returns list of all the categories present in json format
 *       500:
 *         description: Internal server error
 */

router.get("/getAllCategories", async (req, res) => {

    try {
        const categories = await Category.find();
        res.json(categories);
    }

    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

/**
 * @swagger
 * /api/category/createCategory:
 *   post:
 *     description: Creates a new category.
 *     responses:
 *       200:
 *         description: Category created successfully
 *       400 :
 *         description: Category already exists.
 *       500:
 *         description: Internal server error
 */
router.post("/createCategory", async (req, res) => {

    try {
        const {name} = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({ message: '❌ Category already exists.' });
        }

        const newCategory = new Category({
            name: name 
        });
        const category = await newCategory.save();
        res.status(200).json({ message: '✅ Category created successfully.', Category: category });
    }
    catch(err) {
        res.status(500).json({"errors": err.errors});
    }
});

/**
 * @swagger
 * /api/category/getCategory:
 *   get:
 *     description: Returns category name for category id.
 *     responses:
 *       200:
 *         description: Returns Category in json format. 
 *       500:
 *         description: Internal server error
 */
router.get("/getCategoryById" , async  (req, res) => {

    try {
        const id = req.query.id;
        const category = await Category.findById(id);
        res.json(category);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


/**
 * @swagger
 * /api/category/deleteCategory:
 *   delete:
 *     description: Delete a category from the database.
 *     responses:
 *       200:
 *         description: Category deleted successfully
 *       400 :
 *         description: Unauthorized attempt  
 *       404  :
 *         description : Category is not present
 *       500:
 *         description: Internal server error
 */
router.delete("/deleteCategory" , async (req, res) => {

    try {
        const categoryId = req.query.id;
        if (!categoryId) {
            return res.status(401).json({ message: '❌ Unauthorized' });
        }

        const category = await Category.findById(categoryId);
        if (!category) {
            return res.status(404).json({ message: '❌ Category not found' });
        }

        await Category.deleteOne({ _id: categoryId });

        res.status(200).json({ message: '✅ Category deleted successfully', deletedCategory: category });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
