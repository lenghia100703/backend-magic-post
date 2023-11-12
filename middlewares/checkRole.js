const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && req.user.role === role) {
            console.log('role ok');
            next();
        } else {
            res.status(403).json({ message: 'permission denied' });
        }
    };
};

module.exports = checkRole;
