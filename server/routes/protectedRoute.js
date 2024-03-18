import Router from "express";
import verifyToken from "../middleware/authMiddleware.js";

const router = Router();

/**
 * @swagger
 * /api/protectedRoute/:
 *   get:
 *     description: for authorization of jwt token.
 *     responses:
 *       200:
 *         description: Protected route accessed
 */

router.get('/', verifyToken, (req, res) => {
    res.status(200).json({ message: 'Protected route accessed' });
});

export default router;
