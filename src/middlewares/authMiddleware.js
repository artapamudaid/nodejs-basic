const jwt = require('jsonwebtoken');

require('dotenv');

const protect = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1]; //Format : "Bearer <token>"

    if(!token) {
        return res.status(401).json({
            message: 'Akses ditolak, token kosong',
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(401).json({
            message: 'Token tidak valid',
        });
    }
};

module.exports = protect;