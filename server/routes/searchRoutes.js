const express = require('express');
const { check } = require('express-validator');

const searchController = require('../controllers/searchController');

const router = express.Router();

// Route for movie searches checks for all required fields in the request 
router.post(
    '/search/movies', 
    check('query').notEmpty(),
    searchController.postSearchMovie
);

module.exports = router;