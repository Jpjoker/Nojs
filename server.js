const express = require('express');
const mongoose = require('mongoose');
const newsRoutes = require('./routes/newsRoutes');
const commentRoutes = require('./routes/commentRoutes');
const bodyParser = require('body-parser');
const app = express();

// Database configuration and connection
const dbConfig = require('./config/db');
mongoose.connect(dbConfig.url, dbConfig.options);

app.use(bodyParser.json());

// Routes
app.use('/news', newsRoutes);
app.use('/comments', commentRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
