const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 3
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    strategy: {
        type: String,
        enum: ['local', 'google'],
        required: true
    },
    password: {
        type: String,
        required: function() {
            return this.strategy === 'local';
        },
        min: 8
    }
},
{
    timestamps: true,
});



userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SIGNATURE, { expiresIn: '15m'});
    return token;
}


const validateUser = (userData) => {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .pattern(/^[A-Za-z]+$/)
        .required(),
        email: Joi.string()
        .pattern(/^[^@]+@[^@.]+\.[a-z]+$/)
        .required(),
        password: Joi.string()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required(),
        confirmPassword: Joi.ref('password')
    });

    return schema.validate(userData);
}


const validateUserLogin = (userData) => {
    const schema = Joi.object({
        email: Joi.string()
        .pattern(/^[^@]+@[^@.]+\.[a-z]+$/)
        .required(),
        password: Joi.string()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
        .required()
    });

    return schema.validate(userData)
}


const User =  mongoose.model('User', userSchema);


module.exports = {
    User,
    validateUser,
    validateUserLogin
}