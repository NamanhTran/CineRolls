const express = require('express');

const searchController = require('../controller/searchController');

const router = express.Router();

router.get('/search', searchController.getSearchMovie);

router.post('/search', searchController.postSearchMovie);

module.exports = router;