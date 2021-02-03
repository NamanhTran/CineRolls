const bcrypt = require('bcrypt');
const config = require('config');
const mongoose = require('mongoose');

const User = require('../models/userModel');

const userExists = async (username=undefined, email=undefined) => {
    try {
        const query = await User.exists({
            $or: [{username: username}, {email: email}]
        });

        if (query) {
            return true;

        } else {
            return false;
        }

    } catch (error) {
        if (error) {
            console.log('error: ', error);  
        }
    }
};

const createUser = (username, email, password) => {
    const newUser = new User({username: username, email: email, password: password, lists: [], reviews:[]});

    newUser.save((error) => {
        if (error) {
            console.log('error: ', error);  
        }
    });
}

const validateSignUpQuery = (req, res) => {
    const { username, password, email } = req.body;
    
    if (username === undefined) {
        return res.status(400).send('400: No "username" parameter provided.');
    }

    if (email === undefined) {
        return res.status(400).send('400: No "email" parameter provided.');
    }

    if (password === undefined) {
        return res.status(400).send('400: No "password" parameter provided.');
    }

    return;
};

const checkLogin = async (username, password) => {
    try {
        const userInfo = await User.findOne({username: username});

        const isPasswordCorrect = await bcrypt.compare(password, userInfo.password);

        return isPasswordCorrect;

    } catch (error) {
        if (error) {
            console.log(error)
        }
    }
};

exports.postSignUp = async (req, res, next) => {
    // Do some validation for username, email, and password
    validateSignUpQuery(req, res);

    // Get the username, email, and password from the req body
    const { username, password, email } = req.body;

    // Check if user exits in the database
    if (await userExists(username, email)) {
        return res.status(409).send('409: Username or email already exists');
    }

    else {
        try {
            // Hash Password
            const hashedPassword = await bcrypt.hash(password, config.get('SALT_ROUNDS'));
            
            // Insert into DB
            createUser(username, email, hashedPassword);

            // Set session isLoggedIn to be true
            req.session.isLoggedIn = true;
            req.session.save(() => {
                return res.redirect(200, '/');
            });

        } catch (error) {
            if (error) {
                console.log('error: ', error);  
            }
        }
    }
};

exports.postLogin = async (req, res, next) => {
    // Get the username, email, and password from the req body
    const { username, password } = req.body;

    // Check if the user exists
    if (!await userExists(username)) {
        return res.status(401).send('401: Unauthorized');
    }

    if (await checkLogin(username, password)) {
        // Set session isLoggedIn to be true
        req.session.isLoggedIn = true;
        await req.session.save();
        
        return res.redirect(200, '/');

    } else {
        return res.status(401).send('401: Unauthorized');
    }
};

exports.logout = (req, res, next) => {
    if (res.session) {
        res.session.destroy(() => {
            res.redirect(200, '/');
        });

    } else {
        return res.status(400).send('400: Missing session header');
    }
};