const NewsPost = require('../models/NewsPost');
const newsValidator = require('../validators/newsValidator');

exports.createNewsPost = async (req, res) => {
    try {
        const validation = validateNewsPost(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.details);
        }

        const post = new NewsPost(req.body);
        await post.save();
        res.status(201).send(post);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.getAllNewsPosts = async (req, res) => {
    try {
        let { offset = 0, limit = 10 } = req.query;
        offset = parseInt(offset);
        limit = parseInt(limit);

        const posts = await NewsPost.find().skip(offset).limit(limit);
        res.send(posts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.searchNewsPosts = async (req, res) => {
    try {
        const { title } = req.query;
        const posts = await NewsPost.find({ title: new RegExp(title, 'i') });
        res.send(posts);
    } catch (error) {
        res.status(500).send({ message: error.message });
    } 
};

exports.updateNewsPost = async (req, res) => {
    try {
        const validation = validateNewsPost(req.body);
        if (validation.error) {
            return res.status(400).send(validation.error.details);
        }

        const post = await NewsPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!post) {
            return res.status(404).send({ message: 'News Post not found' });
        }
        res.send(post);
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};

exports.deleteNewsPost = async (req, res) => {
    try {
        const post = await NewsPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).send({ message: 'News Post not found' });
        }
        res.send({ message: 'Post deleted' });
    } catch (error) {
        res.status(500).send({ message: error.message });
    }
};