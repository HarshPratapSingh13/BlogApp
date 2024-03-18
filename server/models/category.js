import mongoose from "mongoose";


/**
 * @swagger
 * components:
 *   models:
 *     Category:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the category
 *         title:
 *           type: string
 *           description: The title of your category
 *         createdAt:
 *           type: string
 *           format: date
 *           description: The date the post was added
 *       example:
 *         id: siue7ai
 *         title: TCS
 *         createdAt: 2020-03-10T04:05:06.157Z
 */


const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

const Category = mongoose.model('Category', categorySchema , 'Category'); 
export default Category;
