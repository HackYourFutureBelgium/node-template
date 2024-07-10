import jwt from 'jsonwebtoken';

const verifyToken = (req, res, next) => {
    const token = req.cookies.token;

    console.log('Received token:', token);

    if (!token) {
        console.log('No token provided');
        return res.status(401).json({ message: 'No token provided' });
    }

    jwt.verify(token, process.env.TOKEN_ACCESS_SECRET, (err, decoded) => {
        if (err) {
            console.log('Token verification failed:', err.message);
            return res.status(403).json({
                message: 'Failed to authenticate token',
                error: err.message
            });
        }

        console.log('Token verified successfully. Decoded:', decoded);
        req.userId = decoded.id;
        next();
    });
};

export default verifyToken;
