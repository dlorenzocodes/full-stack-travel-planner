const express = require('express');
const router = express.Router();
const { logger } = require('../config/logger');
const { User } = require('../models/userModel');
const { getGoogleAuthUrl, getGoogleUser } = require('../config/oauth');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: 15 * 60 * 1000 
}


router.get('/url', (req, res) => {
    let url = getGoogleAuthUrl();
    return res.send(url);       
});

// Google callback route
router.post('/', async (req, res, next) => {
    // const code = String(req.query.code);

    const { user, email } = req.body;
    console.log(user, email)
   
    try{
        // const user = await getGoogleUser(code);
        
        // const exsistingUser = await User.findOne({ email: user.email });

        if(!user || !email) {
            res.status(400);
            throw new Error('An error has occured. Please try again later!');
        }

        const exsistingUser = await User.findOne({ email });

        if(exsistingUser && exsistingUser.strategy !== 'google'){
            // return res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
            res.status(400);
            throw new Error('This email is already linked to an account. Please use a different email!')
        }

        if(exsistingUser){
            const jwtToken = exsistingUser.generateToken();
            res.cookie('jwt', jwtToken, cookieOptions);
            // return res.redirect(`${process.env.CLIENT_URL}/?success=true`);
            return res.status(200).send({ name: exsistingUser.name, id: exsistingUser._id });
            
        }

        try{
            // const newUser = await User.create({
            //     name: user.given_name,
            //     email: user.email,
            //     strategy: 'google'
            // });

            const newUser = await User.create({
                name: user,
                email,
                strategy: 'google'
            });

            if(newUser) {
                const jwtToken = newUser.generateToken();
                res.cookie('jwt', jwtToken, cookieOptions);
                // res.redirect(`${process.env.CLIENT_URL}/?success=true`);
                return res.status(200).send({ name: newUser.name, id: newUser._id });
            }

            req.user = newUser;
        }catch(err){
            // res.redirect(`${process.env.CLIENT_URL}/login?error=true`);
            logger.error(err);
            throw new Error('An error has ocurred. Please try again later!')
        }

        req.user = exsistingUser;

    }catch(err){
        logger.error(err);
        console.log(err);
        next(err);
    }
});


router.get('/failed', (req, res, next) => {

    try{
        if(!req.user){
            res.status(400);
            throw new Error('Unable to sign you in');
        }
    }catch(err){
        logger.error(err);
        next(err);
    }

});


module.exports = router;