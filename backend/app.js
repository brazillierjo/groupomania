const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/user');
const postsRoutes = require('./routes/post');
const helmet = require('helmet');
require('dotenv').config()

app.use(helmet());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

const connectSQL = require('./mysql');
app.use(bodyParser.json());
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/auth', userRoutes);
app.use('/api/posts', postsRoutes);

module.exports = app;