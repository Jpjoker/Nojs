const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true, useUnifiedTopology: true});

const NewsPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true }
});

const CommentSchema = new mongoose.Schema({
  postId: { type: mongoose.Schema.Types.ObjectId, ref: 'NewsPost', required: true },
  content: { type: String, required: true }
});

const NewsPost = mongoose.model('NewsPost', NewsPostSchema);
const Comment = mongoose.model('Comment', CommentSchema);

const app = express();

app.use(bodyParser.json());

app.post('/news', async (req, res) => {
  const post = new NewsPost(req.body);
  await post.save();
  res.send(post);
});

app.get('/news', async (req, res) => {
  let { offset = 0, limit = 10 } = req.query;
  offset = parseInt(offset);
  limit = parseInt(limit);
  const posts = await NewsPost.find().skip(offset).limit(limit);
  res.send(posts);
});

app.get('/news/search', async (req, res) => {
  const { title } = req.query;
  const posts = await NewsPost.find({ title: new RegExp(title, 'i') });
  res.send(posts);
});

app.put('/news/:id', async (req, res) => {
  const post = await NewsPost.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(post);
});

app.delete('/news/:id', async (req, res) => {
  await NewsPost.findByIdAndDelete(req.params.id);
  res.send({ message: 'Post deleted' });
});

app.post('/comments', async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.send(comment);
});

app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.send(comments);
});

app.put('/comments/:id', async (req, res) => {
  const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.send(comment);
});

app.delete('/comments/:id', async (req, res) => {
  await Comment.findByIdAndDelete(req.params.id);
  res.send({ message: 'Comment deleted' });
});

app.listen(3000, () => console.log('Server started on port 3000'));
