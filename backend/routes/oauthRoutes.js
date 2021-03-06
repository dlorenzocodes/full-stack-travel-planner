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
    return res.send(getGoogleAuthUrl());
});

router.get('/', async (req, res, next) => {
    const code = String(req.query.code);
   
    try{
        const user = await getGoogleUser(code);
        
        const exsistingUser = await User.findOne({ email: user.email });

        if(exsistingUser && exsistingUser.strategy !== 'google'){
            return res.redirect('http://localhost:3000/login?error=true');
        }

        if(exsistingUser){
            const jwtToken = exsistingUser.generateToken();
            res.cookie('jwt', jwtToken, cookieOptions);
            return res.redirect('http://localhost:3000/?success=true');
        }

        try{
            const newUser = await User.create({
                name: user.given_name,
                email: user.email,
                strategy: 'google'
            });

            if(newUser) {
                const jwtToken = newUser.generateToken();
                res.cookie('jwt', jwtToken, cookieOptions);
                res.redirect('http://localhost:3000/?success=true');
            }

            req.user = newUser;
        }catch(err){
            res.redirect('http://localhost:3000/login?error=true');
            logger.error(err);
        }

        req.user = exsistingUser;

    }catch(err){
        logger.error(err);
    }
});

router.get('/failed', (req, res, next) => {

    try{
        if(!req.user){
            res.status(400);
            throw new Error('Unable to sign you in');
        }
    }catch(err){
        next(err)
    }

});


module.exports = router;