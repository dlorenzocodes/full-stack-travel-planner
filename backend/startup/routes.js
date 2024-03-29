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
    origin: process.env.CLIENT_URL,
    methods: 'PUT, POST, DELETE, GET',
    allowedHeaders: ['Content-Type', 'Set-Cookie'],
    credentials: true,
}

module.exports = function(app){
    
    if(process.env.NODE_ENV === 'production') {
        app.use((req, res, next) => {
          if (req.header('x-forwarded-proto') !== 'https')
            res.redirect(`https://${req.header('host')}${req.url}`)
          else
            next()
        })
    }
    
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '../','public/assets')));
    app.use(cors(corsOptions));
    app.use(cookieParser());
    app.use('/users', users);
    app.use('/auth/google', oauthRoutes);
    app.use('/places', placesRoutes);
    app.use('/trips', tripRoutes);

    // Serve Frontend 
    if(process.env.NODE_ENV === 'production'){
        app.use(express.static(path.join(__dirname, '../', '../frontend/build')));
        app.get('*', (req, res) => {
            res.sendFile(path.resolve(__dirname, '../../', 'frontend', 'build', 'index.html'));
        })
    }
    
    app.use(errorHandler);
}