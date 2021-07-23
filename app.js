const express = require('express');
const authRouter = require('./routes/authRoutes');
const homeRouter = require('./routes/homeRoutes');
const postRouter = require('./routes/postRoutes');
const app = express();
require('./controllers/googleLoginController')
require('./routes/googleLoginRoutes')(app);


// Middleware
app.use(express.json());

// Mounting Routes
app.use('/api/user', authRouter);
app.use('/api/home', homeRouter);
app.use('/api/posts', postRouter);

module.exports = app;
