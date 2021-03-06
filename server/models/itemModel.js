const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    listId: {
        type: mongoose.ObjectId,
        required: true
    },

    ownerId: {
        type: mongoose.ObjectId,
        require: true
    },

    title: {
        type: String,
        require: true
    },

    posterUrl: {
        type: String,
        require: true
    },

    rating: {
        type: Number,
        require: false
    },

    review: {
        type: String,
        require: false
    },

    emojiReview: {
        type: String,
        require: false
    }
});

module.exports = mongoose.model('item', itemSchema);