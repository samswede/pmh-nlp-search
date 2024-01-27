const mongoose = require('mongoose');

const postsSchema = new mongoose.Schema({
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
            required: true,
            },
});

module.exports = mongoose.model('Post', postsSchema);