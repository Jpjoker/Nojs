const Comment = require('../models/Comment');
const commentValidator = require('../validators/commentValidator');

exports.createComment = async (req, res) => {
    try {
        const validation = validateComment(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.details);
        }

        const comment = new Comment(req.body);
        await comment.save();
        res.status(201).send(comment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllComments = async (req, res) => {
    try {
        const comments = await Comment.find();
        res.send(comments);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.updateComment = async (req, res) => {  
    try {
        const validation = validateComment(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.details);
        }

        const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        res.send(comment);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteComment = async (req, res) => {
    try {
        const comment = await Comment.findByIdAndDelete(req.params.id);
        if (!comment) {
            return res.status(404).send({ message: 'Comment not found' });
        }
        res.send({ message: 'Comment deleted' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }

};