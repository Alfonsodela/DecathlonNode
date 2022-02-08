const isAuthenticated = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json('User not authenticated');
    }
    return next();
};

module.exports = {isAuthenticated,};