const express = require('express');
const authRouter = require('./routes/authRoutes');
const homeRouter = require('./routes/homeRoutes');
const postRouter = require('./routes/postRoutes');

const app = express();

// Middleware
app.use(express.json());

// Mounting Routes
app.use('/api/user', authRouter);
app.use('/api/home', homeRouter);
app.use('/api/posts', postRouter);

module.exports = app;
