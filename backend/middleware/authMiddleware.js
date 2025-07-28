const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');

    if (!token) return res.status(401).json({ msg: 'No token, access denied' });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // { id, role }
        next();
    } catch (err) {
        res.status(401).json({ msg: 'Invalid token' });
    }
};

const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ msg: 'Access forbidden: Admins only' });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
