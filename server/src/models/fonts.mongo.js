const mongoose = require('mongoose');

const fontsSchema = new mongoose.Schema({
        index: {
            type: Number,
            required: true
            },
        name: {
            type: String,
            required: true
            },
        description: {
            type: String,
            required: false,
            default: 'NOT SPECIFIED'
            },
        image: {
            type: String,
            required: false,
            default: 'NOT SPECIFIED'
            },
        embedding: [Number],
});

module.exports = mongoose.model('Font', fontsSchema);