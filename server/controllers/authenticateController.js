const bcrypt = require('bcrypt');
const config = require('config');
const mongoose = require('mongoose');
const { validationResult } = require('express-validator');

const User = require('../models/userModel');

const usernameOrEmailExists = async (username=undefined, email=undefined) => {
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

const createErrorJson = (param, msg) => {
    return {
        errors: [{'param': param, 'msg': msg}]
    };
}

exports.postSignUp = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    else {
        // Get the username, email, and password from the req body
        const { username, password, email } = req.body;

        // Check if user exits in the database
        if (await usernameOrEmailExists(username, email)) {
            return res.status(409).json(createErrorJson('username', 'existed'));
        }

        else {
            try {
                // Hash Password
                const hashedPassword = await bcrypt.hash(password, config.get('SALT_ROUNDS'));
                
                // Insert into DB
                createUser(username, email, hashedPassword);

                // Set session isLoggedIn to be true
                req.session.isLoggedIn = true;
                req.session.user.username = username;

                await req.session.save();

                return res.status(200).json(req.session.user);

            } catch (error) {
                if (error) {
                    console.log('error: ', error);
                    return res.status(500).json(createErrorJson(null, 'server error'));
                }
            }
        }
    }
};

exports.postLogin = async (req, res, next) => {
    // Get the username, email, and password from the req body
    const { username, password } = req.body;

    // Check if the user exists
    if (!await usernameOrEmailExists(username)) {
        return res.status(401).json(createErrorJson(null, 'unauthorized'));
    }

    if (await checkLogin(username, password)) {
        // Set session isLoggedIn to be true
        req.session.isLoggedIn = true;
        req.session.user = {username: username};
        await req.session.save();
        
        return res.status(200).json(req.session.user);

    } else {
        return res.status(401).json(createErrorJson(null, 'unauthorized'));
    }
};

exports.logout = async (req, res, next) => {
    if (req.session) {
        await req.session.destroy();

        return res.sendStatus(200);

    } else {
        return req.status(400).json(createErrorJson('session', 'no session header provided'));
    }
};

exports.getCheckSession = (req, res, next) => {
    if (req.session.isLoggedIn) {
        // returns true if a user already logged in.
        res.status(200).json({isLoggedIn: true, user: req.session.user});
    } else {
        res.status(401).json({isLoggedIn: false});
    }
};