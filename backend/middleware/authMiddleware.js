import { verifyToken } from '../utils/auth.js';

const authMiddleware = (req, res, next) => {
    // Get token from header
    const token = req.header('Authorization').split(' ')[1];


    // Check if token exists
    if (!token) {
        return res.status(401).json({ message: 'No token, authorization denied' });
    }

    try {
        // Verify token
        const decoded = verifyToken(token);
        // Attach user ID to request object
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token error:', error);
        res.status(401).json({ message: 'Token is not valid' });
    }
};


const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next();
    } else {
        res.status(403).send('Admin access required');
    }
};

export { authMiddleware, admin };
