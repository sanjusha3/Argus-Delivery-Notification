const jwt = require("jsonwebtoken")
require("dotenv").config()

function verifyToken(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token provided' });
    }

    // Verify the token
    jwt.verify(token, process.env.TOKEN_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token' });
        }

        req.user = decoded;

        next();
    });
}

function verifyAdmin(req, res, next) {
    // Check if the user has the admin role
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
}

function verifyEmployee(req, res, next) {
    // Check if the user has the admin role
    if (req.user.role !== 'employee') {
        return res.status(403).json({ message: 'Unauthorized access' });
    }
    next();
}


module.exports = { verifyToken, verifyAdmin, verifyEmployee }