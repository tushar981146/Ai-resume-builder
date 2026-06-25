const jwt = require('jsonwebtoken');

const blacklist = require('../models/blacklist.model')



async function authUser(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    };

    const isTokenBlacklisted = await blacklist.findOne({ token });

    if (isTokenBlacklisted) {
        return res.status(401).json({ message: 'invalid token' });
    }

    try {
            const decoded = jwt.verify(token, process.env.jwt_secret)

            req.user = decoded
            next()

    } catch (error) {
        return res.status(401).json({ message: 'invalid token' });
    }

}

module.exports = { authUser };