const { logger } = require('../config/logger');
const { User } = require('../models/userModel');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: 15 * 60 * 1000 
}


// @desc   Google social validation
// @route  POST /auth/google
// @access Public
const googleSocialValidation = async (req, res, next) => {
    const { user, email } = req.body;
   
    try{

        if(!user || !email) {
            res.status(400);
            throw new Error('An error has occured. Please try again later!');
        }

        const exsistingUser = await User.findOne({ email });

        if(exsistingUser && exsistingUser.strategy !== 'google'){
            res.status(400);
            throw new Error('This email is already linked to an account. Please use a different email!')
        }

        if(exsistingUser){
            const jwtToken = exsistingUser.generateToken();
            res.cookie('jwt', jwtToken, cookieOptions);
            return res.status(200).send({ name: exsistingUser.name, id: exsistingUser._id });
            
        }

        try{

            const newUser = await User.create({
                name: user,
                email,
                strategy: 'google'
            });

            if(newUser) {
                const jwtToken = newUser.generateToken();
                res.cookie('jwt', jwtToken, cookieOptions);
                return res.status(200).send({ name: newUser.name, id: newUser._id });
            }

            req.user = newUser;

        }catch(err){
            logger.error(err);
            throw new Error('An error has ocurred. Please try again later!')
        }

        req.user = exsistingUser;

    }catch(err){
        logger.error(err);
        next(err);
    }
};

module.exports = { googleSocialValidation }