const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
        index: {
            type: Number,
            required: true,
            unique: true
            },

        title: {
            type: String,
            required: false,
            default: 'NOT SPECIFIED'
            },
            
        author: {
            type: String,
            required: false,
            default: 'Antonio'
            },

        description: {
            type: String,
            required: true,
            },

        githubURL: {
            type: String,
            required: false,
            default: 'NOT SPECIFIED'
            },

        linkedinURL: {
            type: String,
            required: false,
            default: 'NOT SPECIFIED'
            },
            
        embedding: {
            type: [Number],
            required: false,
            default: Array(3).fill(0)
            },
});

module.exports = mongoose.model('Post', postsSchema);