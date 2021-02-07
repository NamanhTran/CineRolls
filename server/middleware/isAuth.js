moduel.export = (req, res, next) => {
    if (!req.session.isLoggedIn) {
        // returns true if a user already logged in.
        res.status(401).redirect('/login');
    }
    
    next();
};