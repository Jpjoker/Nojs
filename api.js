


// tweede model better maar net ni af
// const express = require('express');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const newsRoutes = require('./routes/newsRoutes');
// const commentRoutes = require('./routes/commentRoutes');

// const app = express();
// app.use(bodyParser.json());

// // Database connection
// mongoose.connect('mongodb://localhost:27017/myapp', { useNewUrlParser: true, useUnifiedTopology: true })
//   .then(() => console.log('MongoDB connected'))
//   .catch(err => console.error('Could not connect to MongoDB', err));

// // Routes
// app.use('/news', newsRoutes);
// app.use('/comments', commentRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//     console.log(`Server is running on port ${PORT}`);
// });






// eerst model.

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
