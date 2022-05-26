const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const logger = require('../config/logger');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: 15 * 60 * 1000 
}

// @desc   Login an user
// @route  /users/login
// @access Public
const loginUser = async (req, res, next) => {
   const { email, password } = req.body;

   try{
        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))){
            const token = user.generateToken();
            res.cookie('jwt', token, cookieOptions);
            req.user = user;
            res.status(200).json({ id: user._id, name: user.name });
        } else{
            res.status(401);
            throw new Error('Invalid credentials')
        }
   }catch(err){
       next(err);
   }
};



// @desc   Register a new user. On success redirects user to login
// @route  /users
// @access Public
const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body;

    try{

        const existingUser = await User.findOne({ email });

        if(existingUser) {
            res.status(400);
            throw new Error('User already exists');
        }

        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        try{
            const newUser = await User.create({
                name,
                email,
                strategy: 'local',
                password: hashedPassword
            });
            
            if(newUser) res.status(201).send('Account successfully created. Log in!')
        }catch(err){
            res.status(500)
            throw new Error('Account could not be created. Please try again later!')
        }

    }catch(err){
        next(err)
    }
};


// @desc   Gets current user
// @route  /users/me
// @access Private
const getCurrentUser = (req, res, next) => {
    const user = {
        id: req.user._id,
        name: req.user.name
    }
    res.status(200).json(user);
}

const handleUserLogout = (req, res, next) => {
    const cookies = req.cookies;
    console.log(cookies);

    try{
        if(cookies.jwt){
            res.clearCookie('jwt', cookieOptions);
            return res.sendStatus(204);
        } else{
            return res.sendStatus(204);
        }
    }catch(err){
        logger.error(err);
        next(new Error('Could not be logged out'));
    }
}

module.exports = {
    loginUser,
    registerUser,
    getCurrentUser,
    handleUserLogout
}