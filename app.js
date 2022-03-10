const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const sauceRoutes = require('./route/sauce');
const userRoutes = require('./route/user');
const app = express();
require('dotenv').config();

//Connect to MongoDB database
mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connecte to DB'))
    .catch((error) => console.log('unable to connect to DB'));

 //Use CORS to allow the front end and back end to communicate
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// Extract the body portion of incoming request to req.body
app.use(bodyParser.json());
app.use(express.json());


// Tell Express where to store the images when we receive a request to the /images endpoint.
    app.use('/images', express.static(path.join(__dirname, 'images')));
    app.use('/api/sauces', sauceRoutes);
    app.use('/api/auth', userRoutes);

module.exports = app;