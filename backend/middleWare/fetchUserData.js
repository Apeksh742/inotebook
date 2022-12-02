const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.REACT_APP_JWT_SECRET;

const fetchUserData = async (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    try {
        const token = req.header('auth-token');
        if (!token) {
            res.status(401).json({
                success: false,
                msg: "Please authenticate using a valid token",
            });
        }
        const payload = jwt.verify(token, JWT_SECRET);
        req.user = payload.user;
        next();
    }
    catch (error) {
        console.log("fetchUserData error: " + error.message + " auth-token-received: " + req.header('auth-token'));
        res.status(401).json({
            success: false,
            msg: "Please authenticate using a valid token",
        });
    }

}
module.exports = fetchUserData