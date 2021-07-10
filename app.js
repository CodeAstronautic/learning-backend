const express = require('express');
const authRouter = require('./routes/authRoutes');
const homeRouter = require('./routes/homeRoutes');

const app = express();

// Middleware
app.use(express.json());

// Mounting Routes
app.use('/api/user', authRouter);
app.use('/api/home', homeRouter);

module.exports = app;
