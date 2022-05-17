const express = require('express');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const users = require('../routes/userRoutes');
const googleAuth = require('../routes/googleAuthRoutes');
const cors = require('cors');
const session = require('express-session');
const errorHandler = require('../middleware/errorMiddleware');
require('../config/passport');

const corsOptions = {
    origin: 'http://localhost:3000',
    methods: 'PUT, POST, DELETE, GET',
    allowedHeaders: ['Content-Type', 'Set-Cookie'],
    credentials: true,
}

const sessCookieOptions = {
    secret: 'secretkey',
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production' ? true : false,
        sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        maxAge: process.env.MAXAGE * 1000 
    }
}

module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(session(sessCookieOptions))
    app.use(cookieParser());
    app.use(cors(corsOptions));
    app.use(passport.initialize());
    app.use(passport.session());
    app.use('/users', users);
    app.use('/auth/google', googleAuth);
    app.use(errorHandler);
}