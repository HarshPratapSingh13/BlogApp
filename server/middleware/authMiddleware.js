import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Access denied' });
    }

    try {
        const decoded = jwt.decode(token, process.env.SECRET_ACCESS_TOKEN);
        req.userId = decoded.userId;
        req.username = decoded.username;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token' });
    }
 };

export default verifyToken;