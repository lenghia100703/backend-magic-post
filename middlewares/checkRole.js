const checkRole = (role) => {
    return (req, res, next) => {
        if (req.user && role.includes(req.user.role)) {
            next();
        } else {
            res.status(403).json({ message: 'permission denied' });
        }
    };
};

module.exports = checkRole;
