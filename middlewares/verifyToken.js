const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        const accessToken = token.split(' ')[1];
        jwt.verify(accessToken, process.env.SIGN_KEY, (err, user) => {
            if (err) {
                return res.status(403).json(err);
            }
            req.user = user;
            console.log('da dang nhap roi');
            next();
        });
    } else {
        return res.status(401).json('you are not authenticated');
    }
};

module.exports = verifyToken;
