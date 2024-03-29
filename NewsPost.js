const mongoose = require('mongoose');

const NewsPostSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('NewsPost', NewsPostSchema);
