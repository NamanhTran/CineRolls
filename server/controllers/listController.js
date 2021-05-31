const { validationResult } = require('express-validator');
const List = require('../models/listModel');
const Item = require('../models/itemModel');
const User = require('../models/userModel');

// Check to see if the list id belongs to the user
const listIdBelongToUser = async (listId, userId) => {
    try {
        const listExists = await User.find({ lists: { $all: [listId] } }).where('_id').equals(userId).exec();

        if (listExists) {
            return true;
        }
    
        else {
            return false;
        }
    }

    catch (error) {
        console.log(`Error in listIdBelongToUser: ${error}`);
        return false;
    }
};

// Gets all lists that are publicly available
exports.getPublicLists = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Query all the lists that are public
        const query = await List.find().where('public').equals(true).exec();

        // Return the public lists as a JSON
        return res.status(200).json(query);
    }

    catch (error) {
        console.log(`Error in getPublicLists: ${error}`);
        return res.status(400).send();
    }
    
};

// Get all lists assoicated with the user
exports.getUserLists = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Get all lists associated with the user
        const query = await User.find({lists}).where('_id').equals(res.session.user['id']).exec();

        // Return lists as a JSON
        return res.status(200).json(query);
    }

    catch (error) {
        console.log(`Error in getUserLists: ${error}`);
        return res.status(400).send();
    }
};

// Create a list assoicated with the username
exports.createList = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // Get the title of the list and bool wether or not the list should be public
    const {title, public} = req.body;

    try {
        // Check if the list name exists already for the user.
        const list = await List.find({ title }).where('ownerId').equals(req.session.user['id']).exec();
        
        // If the name does exist return an error code to the user.
        if (!list.length) {
            return res.status(403).send();
        }
    }

    catch (error) {
        console.log(`Error in createList while checking for list given exists: ${error}`);
        return res.status(400).send();
    }

    // If the name does not exist then create the list under the username
    // Create new list
    try {
        const newList = new List({ ownerId: req.session.user['id'], title: title, items: [], public: public });

        await newList.save();
    }

    catch (error) {
        console.log(`Error in createList while saving list: ${error}`);
        return res.status(400).send();
    }

    try {
        // Append list ID to the user's lists array in the document
        await User.updateOne({ $push: { lists: newList._id } }).where('_id').equals(res.session.user['id']).exec();

        // Return the new list as a JSON
        return res.status(200).json(newList);
    }

    catch (error) {
        console.log(`Error in createList while saving list ID to user: ${error}`);
        return res.status(400).send();
    }
};

// Get the list information given a list id
exports.getList = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId } = req.body;
    const userId = req.session.user['id'];

    // Check if the list belongs to the user
    if (!listIdBelongToUser(listId, userId)) {
        // If the list does not belong to the user then return error
        return res.status(403).send();
    }

    try {
        // If the List does belong to the user
        // Get the list given the list id
        const list = await List.find().where('_id').equals(listId).exec();

        // If the list does not exist send error
        if (!list.length) {
            return res.status(403).send();
        }

        // If the list exists then return the list as a JSON
        return res.status(200).json(list);
    }

    catch (error) {
        console.log(`Error in getList while looking for user: ${error}`);
        return res.status(400).send();
    }
};

// Delete a list associated with the username
exports.deleteList = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId } = req.body;
    const userId = req.session.user['id'];

    // Check and see if the list id belongs to the user
    if (!listIdBelongToUser(listId, userId)) {
        // If the list does not exist then send an error code
        return res.status(403).send();
    }

    try {
        // Delete list document
        await List.deleteOne().where('_id').equals(listId).exec();
    }

    catch (error) {
        console.log(`Error in deleteList while deleting list in List collection: ${error}`);
        return res.status(400).send();
    }

    try {
        // Remove the list id from the user's lists
        await User.updateOne({ $pull: { 'lists': listId } }).exec();
    }

    catch (error) {
        console.log(`Error in deleteList while deleting listId from User collection: ${error}`);
        return res.status(400).send();
    }

    return res.status(200).send();
};

// Create a list item associated with the list
exports.createListItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId, title, posterUrl, rating, review, emojiReview } = req.body;
    const userId = req.session.id;

    // Check if the list id belongs/exists to the user
    if (!listIdBelongToUser(listId, userId)) {
        return res.status(403).send();
    }

    try {
        const itemExist = await List.find({'items.title': title}).exec();

        // If the item exists then return an error code
        if (!itemExist,length) {
            return res.status(403).send();
        }
    }

    catch (error) {
        console.log(`Error in createListItem while checking if item exists in the list: ${error}`);
        return res.status(400).send();
    }

    try {
        const list = await List.findById(listId).exec();

        // If item does not exist then create the list item
        const item = {
            'title': title,
            'posterURL': posterUrl,
            'rating': rating,
            'review': review,
            'emojiReview': emojiReview
        };

        list.items.push(item);

        await list.save();

        // Return the item as a JSON
        return res.status(200).json(item);
    }

    catch (error) {
        console.log(`Error in createListItem while getting list and adding to items array: ${error}`);
        return res.status(400).send();
    }
};

// Get the items information a list id
exports.getListItems = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId } = req.body;
    const userId = req.session.id;

    // Check if the user owns the list id
    if (!listIdBelongToUser(listId, userId)) {
        return res.status(403).send();
    }

    try {
        // Get all items given a list id
        const list = await List.find().where('_id').equals(listId);

        // If the item does not exist send error
        if (!list.length) {
            res.status(403).send();
        }

        // If the item exists then return the item as a JSON
        res.status(200).json(list.items);
    }

    catch (error) {
        console.log(`Error in getListItems while querying for list by listId: ${error}`);
        return res.status(400).send();
    }
};

// Delete a list item associated with the list
exports.deleteListItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId, title } = req.body;
    const userId = req.session.id;

    // Check if the list id belongs/exists to the user
    if (!listIdBelongToUser(listId, userId)) {
        return res.status(403).send();
    }

    try {
        // Check if the item belongs to the list
        const itemExistInList = await List.find({'_id': listId,'items.title': title});

        // If the item does not belong to the list then return error
        if (!itemExistInList) {
            return res.status(403).send();
        }
    }

    catch (error) {
        console.log(`Error in deleteListItem while checking if item exists in list: ${error}`);
        return res.status(400).send();
    }

    // If the item belongs to the list then delete
    try {
        await List.deleteOne({'listId': listId, 'title': title});
    }

    catch (error) {
        console.log(`Error in deleteListItem while deleting list item: ${error}`);
        return res.status(400).send();
    }

    return res.status(200).send();
};

// Update a list item associated with the list
exports.updateListItem = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { listId, title, posterUrl, rating, review, emojiReview } = req.body;
    const userId = req.session.id;

    // Check if the list id belongs/exists to the user
    if (!listIdBelongToUser(listId, userId)) {
        return res.status(403).send();
    }

    try {
        // Check if the item belongs to the list
        const list = await List.find({'_id': listId,'items.title': title});

        // If the item does not belong to the list then return error
        if (!list.length) {
            return res.status(403).send();
        }
    }

    catch (error) {
        console.log(`Error in updateListItem while checking if the item belongs to the list: ${error}`);
        return res.status(400).send();
    }

    try {
        // If the item belongs to the list then update
        // https://stackoverflow.com/questions/55841629/mongoose-update-a-field-in-an-object-of-array
        const list = await List.findOneAndUpdate(
            {'_id': listId},
            {$set: {"myArray.$[el].posterUrl": posterUrl, "myArray.$[el].rating": rating, "myArray.$[el].review": review, "myArray.$[el].emojiReview": emojiReview, }},
            {
                arrayFilters: [{"el.title": title}],
                new: true
            }
        );

        return res.status(200).json(list);
    }

    catch (error) {
        console.log(`Error in updateListItem while checking while updating list item: ${error}`);
        return res.status(400).send();
    }
};