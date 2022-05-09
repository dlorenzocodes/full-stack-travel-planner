const express = require('express');
const cookieParser = require('cookie-parser');
const users = require('../routes/userRoutes');



module.exports = function(app){
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use('/users', users);
}