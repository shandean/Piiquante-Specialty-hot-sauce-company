const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const sauceRoutes = require('./route/sauce');
const userRoutes = require('./route/user');
const app = express();
require('dotenv').config()

app.use(bodyParser.json());
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.DB_CONNECTION,
    { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connecte to DB'))
    .catch((error) => console.log('unable to connect to DB'));

// Tell Express where to store the images when we receive a request to the /images endpoint.
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);


module.exports = app;