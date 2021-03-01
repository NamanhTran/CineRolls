const { validationResult } = require('express-validator');
const List = require('../models/listModel');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

// Gets all lists that are publicly available
exports.getPublicLists = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Query all the lists that are public
    const query = await List.find().where('public').equals(true);

    // Return the public lists as a JSON
    return res.status(200).json(query);
};

// Get all lists assoicated with the user
exports.getUserLists = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get all lists associated with the user
    const query = await User.find({lists}).where('_id').equals(res.session._id);

    // Return lists as a JSON
    return res.status(200).json(query);
};

// Create a list assoicated with the username
exports.createList = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the title of the list and bool wether or not the list should be public
    const {title, public} = req.body;

    // Check if the list name exists already for the user.
    const listNameExist = await List.find({ title }).where('ownerId').equals(req.session.id);

    // If the name does exist return an error code to the user.
    if (listNameExist) {
        return res.status(403).send();
    }
    
    // If the name does not exist then create the list under the username
    else {
        // Create new list
        const newList = new List({ownerId: req.session.id, title: title, items: [], public: public});
        newList.save((error) => {
            if (error) {
                console.log('error: ', error);  
            }
        });

        // Append list ID to the user's lists array in the document
        await User.updateOne({ $push: {lists: newList._id }}).where('_id').equals(res.session.id);

        // Return the new list as a JSON
        return res.status(200).json(newList);
    }
};

// Get the list information given a list id
exports.getList = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the list given the list id

    // If the list does not exist send error

    // If the list exists then return the list as a JSON
};

// Delete a list associated with the username
exports.deleteList = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId } = req.body;

    // Check and see if the list id belongs to the user
    const userListIdExist = await User.find({ lists: { $all: [listId] } }).where('_id').equals(req.session.id);

    // If the list does not exist then send an error code
    if (!userListIdExist) {
        return res.status(403).send();
    }

    else {
        // Delete all items document from the list
        await Item.deleteMany().where('listId').equals(listId);

        // Delete list document
        await List.deleteOne().where('_id').equals(listId);

        // Remove the list id from the user's lists
        await User.updateOne({ $pull: { 'lists': listId } });
    }
};

// Create a list item associated with the list
exports.createListItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId, title, posterUrl, rating, review, emojiReview } = req.body;

    // Check if the item title already exists in the list

    // If the item exists then return an error code

    // If item does not exist then create the list item

    // Add item's id to the list's item array

    // Return the item as a JSON
};

// Get the item information given a item id and list id
exports.getItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the item given the item id

    // If the item does not exist send error

    // If the item exists then return the item as a JSON
};

// Delete a list item associated with the list
exports.deleteListItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if the item belongs to the user

    // If the item does not belong to the user then return error

    // If the item does belong to the user

    // Check if the item belongs to the list

    // If the item does not belong to the list then return error

    // If the item belongs to the list then delete

};

// Update a list item associated with the list
exports.updateListItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Check if the item belongs to the user

    // If the item does not belong to the user then return error

    // If the item does belong to the user

    // Check if the item belongs to the list
    
    // If the item does not belong to the list then return error

    // If the item belongs to the list then update

};