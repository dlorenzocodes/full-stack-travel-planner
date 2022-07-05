const path = require('path');
const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('../routes/userRoutes');
const oauthRoutes = require('../routes/oauthRoutes');
const placesRoutes = require('../routes/placesRoutes');
const tripRoutes = require('../routes/tripRoutes');
const cors = require('cors');
const errorHandler = require('../middleware/errorMiddleware');


const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'PUT, POST, DELETE, GET',
    allowedHeaders: ['Content-Type', 'Set-Cookie'],
    credentials: true,
}

console.log(path.join(__dirname, '../','public/assets'));

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../','public/assets')));
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use('/users', users);
    app.use('/auth/google', oauthRoutes);
    app.use('/places', placesRoutes);
    app.use('/trips', tripRoutes);
    app.use(errorHandler);
}