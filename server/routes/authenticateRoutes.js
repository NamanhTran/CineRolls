const express = require('express');
const { check } = require('express-validator');

const authenticateController = require('../controllers/authenticateController');

const router = express.Router();

// Route for signup checks for all required fields in the request 
router.post(
    '/signup',
    check('username').notEmpty(),
    check('email').notEmpty(),
    check('password').notEmpty(),
    check('email').isEmail(),
    authenticateController.postSignUp
);

// Route for login checks for all required fields in the request
router.post(
    '/login',
    check('username').notEmpty(),
    check('password').notEmpty(),
    authenticateController.postLogin
);

// Route for logout
router.post('/logout', authenticateController.logout);

// Route for checking if the client's session is valid
router.get('/checkSession', authenticateController.getCheckSession);

module.exports = router;