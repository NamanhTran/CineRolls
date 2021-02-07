const mongoose = require('mongoose');

const item = require('./itemModel');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    _id: {
        type: mongoose.ObjectId,
        require: true
    },

    title: {
        type: String,
        require: true
    },

    items: {
        type: [mongoose.ObjectId],
        require: false
    }
});

module.exports = mongoose.model('List', listSchema);