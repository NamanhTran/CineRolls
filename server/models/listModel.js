const mongoose = require('mongoose');

const item = require('./itemModel');

const Schema = mongoose.Schema;

const listSchema = new Schema({
    ownerId: {
        type: mongoose.ObjectId,
        required: true
    },

    title: {
        type: String,
        require: true
    },

    items: {
        type: [mongoose.ObjectId],
        require: false
    },

    public: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('List', listSchema);