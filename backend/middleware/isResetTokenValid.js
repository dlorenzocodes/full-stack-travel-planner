const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { User } = require('../models/userModel');
const { Token } = require('../models/tokenModel');

const isResetTokenValid = async (req, res, next) => {
    const { token, id } = req.body;

    try{
        if(!token || !id){
            res.status(401);
            throw new Error('Not enough permissions to perform this action!');
        }

        if(!mongoose.Types.ObjectId.isValid(id)){
            res.status(400);
            throw new Error('Invalid credentials!');
        }

        const user = await User.findById(id);
        if(!user){
            res.status(400);
            throw new Error('User was not found!');
        }

        const resetToken = await Token.findOne({ userId: user._id });
        if(!resetToken){
            res.status(400);
            throw new Error('Reset link is invalid or has expired!')
        }

        const isValid = await bcrypt.compare(token, resetToken.token);
        if(!isValid){
            res.status(401);
            throw new Error('Invalid credentials!')
        }

        req.user = user;
        next();

    }catch(err){
        console.log(err);
        next(err);
    }
};

module.exports = { isResetTokenValid };