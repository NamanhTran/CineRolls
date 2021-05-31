/*
- Search All Public Lists
  - Check if query is passed in the request

- Get User's Lists
  - Protected
  - Check if session is passed in the request

- Create List
  - Protected
  - Check if list is passed in the request

- Delete List
  - Protected
  - Check if listId is passed in the request

- Create Item for List
  - Protected
  - Check if listId and item is passed in the request

- Delete Item from List
  - Protected
  - Check if itemId and listId is passed in the request

- Update Item's info from List
  - Protected
  - Check if itemId and listId is passed in the request

OPTIONAL IMPLEMENTATIONS

*/

const express = require('express');
const { check } = require('express-validator');

const listController = require('../controllers/listController');
const isAuth = require('../middleware/isAuth');

const router = express.Router();

router.get(
    '/search/public/lists',
    listController.getPublicLists
);

router.get(
    '/lists',
    isAuth,
    listController.getUserLists
);

router.get(
    '/getList',
    isAuth,
    check('listId').notEmpty(),
    listController.getList
);

router.post(
    '/createList',
    isAuth,
    check('title').notEmpty(),
    check('public').notEmpty(),
    listController.createList
);

router.post(
    '/deleteList',
    isAuth,
    check('listId').notEmpty(),
    listController.deleteList
);

router.get(
    '/getListItems',
    isAuth,
    check('listId').notEmpty(),
    listController.getListItems
);

router.post(
    '/createListItem',
    isAuth,
    check('listId').notEmpty(),
    check('title').notEmpty(),
    check('posterUrl').notEmpty(),
    check('rating').notEmpty(),
    check('review').notEmpty(),
    check('emojiReview').notEmpty(),
    listController.createListItem
);

router.post(
    '/deleteListItem',
    isAuth,
    check('listId').notEmpty(),
    check('title').notEmpty(),
    listController.deleteListItem
);

router.post(
    '/updateListItem',
    isAuth,
    check('listId').notEmpty(),
    check('itemId').notEmpty(),
    check('title').notEmpty(),
    check('posterUrl').notEmpty(),
    check('rating').notEmpty(),
    check('review').notEmpty(),
    check('emojiReview').notEmpty(),
    listController.updateListItem
);

module.exports = router;