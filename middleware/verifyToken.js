// middleware/verifyToken.js

import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;
    if (token) {
        jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, data) => {
            if (err) {
                return res.status(498).json({ message: 'Token is not valid' });
            }
            req.userId = data.id;
            next();
        });
    } else {
        res.status(498).json({ message: 'Token is not valid' });
    }
};

export default verifyToken;
