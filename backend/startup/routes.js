const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('../routes/userRoutes');
const cors = require('cors');
const errorHandler = require('../middleware/errorMiddleware');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'PUT, POST, DELETE, GET',
    allowedHeaders: ['Content-Type', 'Set-Cookie'],
    credentials: true,
}

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.use('/users', users);
    app.use(errorHandler);
}