const bcrypt = require('bcrypt');
const config = require('config');
const { validationResult } = require('express-validator');

const User = require('../models/userModel');

// Checks if the username or email already exists in the user document
const usernameOrEmailExists = async (username=undefined, email=undefined) => {
    try {
        // Checks if the user or email exists in the user document
        const query = await User.exists({
            $or: [{username: username}, {email: email}]
        });

        // If there is a query result then return true. False if it does not exist.
        if (query) {
            return true;

        } else {
            return false;
        }

    } catch (error) {
        throw new Error(`A DB error occured when checking if username or email exists: ${error}`);
    }
};

const getUser = async (username) => {
    try {
        const user = await User.findOne().where('username').equals(username);
        return user;
    } catch (error) {
        throw new Error(`A DB error occured when getting username: ${error}`);
    }
};

// Creates an user in MongoDB
const createUser = (username, email, password) => {
    const newUser = new User({username: username, email: email, password: password, lists: [], reviews:[]});

    newUser.save((error) => {
        if (error) {
            throw new Error(`A DB error occured when saving the newly created user: ${error}`); 
        }
    });

    return newUser;
}

// Checks if the username and password is correct
const checkLogin = async (username, password) => {
    try {
        // Find the user in the database
        const userInfo = await User.findOne({username: username});

        // Check if the password matches the user
        const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);

        return isPasswordCorrect;

    } catch (error) {
        throw new Error(`An error occured when trying to find a user the database and checking if the passwords match: ${error}`); 
    }
};

// Creates error response json 
const createErrorJson = (param, msg) => {
    return {
        errors: [{'param': param, 'msg': msg}]
    };
}

// Sign a user up and create a session
exports.postSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Get the username, email, and password from the req body
    const { username, password, email } = req.body;

    // let usernameOrEmailFound = await usernameOrEmailExists(username, email).catch((error) => {
    //     console.log(error);
    //     return res.status(500).json(createErrorJson(null, 'server error'));
    // });

    try {
        // Check if user exits in the database
        if (await usernameOrEmailExists(username, email)) return res.status(409).json(createErrorJson('username', 'existed'));

    } catch (error) {
        console.log(error);
        return res.status(500).json(createErrorJson(null, 'server error'));
    }

    try {
        // Hash Password
        const hashedPassword = await bcrypt.hash(password, config.get('SALT_ROUNDS'));
        
        // Insert into DB
        const newUser = await createUser(username, email, hashedPassword);

        // Set session isLoggedIn to be true
        req.session.isLoggedIn = true;
        req.session.user = {username: newUser.username, id: newUser._id};
        await req.session.save();
        return res.status(200).json(req.session.user);

    } catch (error) {
        console.log(error);
        return res.status(500).json(createErrorJson(null, 'server error'));
    }
};

// Log the user in and create a session
exports.postLogin = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    
    // Get the username, email, and password from the req body
    const { username, password } = req.body;

    try {
        // Check if user exits in the database
        if (!await usernameOrEmailExists(username, email)) return res.status(401).json(createErrorJson(null, 'unauthorized'));

    } catch (error) {
        console.log(error);
        return res.status(500).json(createErrorJson(null, 'server error'));
    }

    try {
        if (await checkLogin(username, password)) {
            const user = await getUser(username);
            // Set session isLoggedIn to be true
            req.session.isLoggedIn = true;
            req.session.user = {username: user.username, id: user._id};
            await req.session.save();
            return res.status(200).json(req.session.user);
    
        } else {
            return res.status(401).json(createErrorJson(null, 'unauthorized'));
        }

    } catch (error) {
        console.log(error);
        return res.status(500).json(createErrorJson(null, 'server error'));
    }
};

// Deletes the session passed
exports.logout = async (req, res, next) => {
    if (req.session) {
        try {
            await req.session.destroy();
            return res.sendStatus(200);

        } catch (error) {
            console.log(error);
            return res.status(500).json(createErrorJson(null, 'server error'));
        }
        
    } else {
        return req.status(400).json(createErrorJson('session', 'no session header provided'));
    }
};

// Checks if session is valid
exports.getCheckSession = (req, res, next) => {
    if (req.session.isLoggedIn) {
        // returns true if a user already logged in.
        res.status(200).json({isLoggedIn: true, user: req.session.user});
    } else {
        res.status(401).json({isLoggedIn: false});
    }
};

exports.usernameOrEmailExists = usernameOrEmailExists;
exports.getUser = getUser;
exports.createUser = createUser;
exports.checkLogin = checkLogin;
exports.createErrorJson = createErrorJson;