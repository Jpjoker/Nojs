const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    postId: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsPost', required: true },
    content: { type: String, required: true }
});

module.exports = mongoose.model('Comment', CommentSchema);
