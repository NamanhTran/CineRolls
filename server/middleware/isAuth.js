module.exports = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        // returns true if a user already logged in.
        return res.status(401).json({ error: "login required" });
    }
    
    else {
        next();
    }
};