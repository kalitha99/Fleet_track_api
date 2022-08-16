const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['x-access-token'];
    if (!authHeader) return res.sendStatus(401);
    console.log(authHeader); // Bearer token

    jwt.verify(

        authHeader,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            console.log(err)
            if (err) return res.sendStatus(403); //invalid token
            req.user = decoded.name;
            req.roles = [decoded.role];
            next();
        }
    );
}

module.exports = verifyJWT