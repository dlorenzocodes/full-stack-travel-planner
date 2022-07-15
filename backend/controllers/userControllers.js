const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');
const logger = require('../config/logger');
const { s3Upload } = require('../config/storage');
const { s3Delete } = require('../config/storage');
const multer = require('multer');


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

            if(user.profile){    
                res.status(200).json({ id: user._id, name: user.name, profile: user.profile });
                return;
            }

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
const getCurrentUser = async (req, res, next) => {
    try{
        const user = await User.findById(req.user._id);
        
        if(!user){
            res.status(404);
            throw new Error('User not found!');
        }

        req.user = user;
        if(user.profile){    
            res.status(200).json({ id: user._id, name: user.name, profile: user.profile });
            return;
        }
        res.status(200).json({ id: user._id, name: user.name });

    }catch(err){
        console.log(err);
        next(err);
    }
}



// @desc   Logout user
// @route  /users/logout
// @access Private
const handleUserLogout = (req, res, next) => {
    const cookies = req.cookies;

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


// @desc   Post user profile image
// @route  /users/profile
// @access Private
const getProfileImage = async (req, res, next) => {
    try{

        if(!req.file){
            res.status(400);
            throw new Error('File must be an image!');
        }

        const result = await s3Upload(req.file);

        if(!result.Location){
            res.status(500);
            throw new Error('Profile image could not be uploaded. Try again later!');
        }

        const updatedUser = await User.findByIdAndUpdate(
            req.user._id,
            { 
                profile: result.Location,
                profileName: result.Key
            }
        )

        if(!updatedUser) {
            res.status(500);
            throw new Error('Profile image could not be uploaded. Try again later!');
        }

        res.sendStatus(200);

    }catch(err){
        next(err)
    } 
};


// @desc   Delete user profile image
// @route  /users/profile/delete
// @access Private
const deleteProfileImage = async (req, res, next) => {
    try{

        const user = await User.findById(req.user._id);
        const result = await s3Delete(user.profileName);

        if(Object.keys(result).length !== 0){
            res.status(500);
            throw new Error('Profile image could not be deleted. Try again later!');
        }

        await User.updateOne(
            { _id: user._id }, 
            { $unset: 
                { profile: user.profile, profileName: user.profileName }
            }
        );

        res.status(200).send('Profile image was successfully deleted!');
    }catch(err){
        console.log(err);
        next(err);
    }
}

module.exports = {
    loginUser,
    registerUser,
    getCurrentUser,
    handleUserLogout,
    getProfileImage,
    deleteProfileImage
}