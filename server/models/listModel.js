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

    items: [
        {
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
        }
    ],

    public: {
        type: Boolean,
        require: true
    }
});

module.exports = mongoose.model('List', listSchema);