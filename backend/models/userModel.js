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
    password: {
        type: String,
        required: true,
        min: 8
    }
},
{
    timestamps: true,
});



userSchema.methods.generateToken = function() {
    const token = jwt.sign({ _id: this._id, name: this.name }, process.env.JWT_SIGNATURE, { expiresIn: process.env.MAXAGE});
    return token;
}

const validateUser = (name, email, password, confirmPassword) => {
    const schema = Joi.object({
        name: Joi.string()
        .min(3)
        .required(),
        email: Joi.string().required(),
        password: Joi.string()
            .min(8)
            .required(),
        confirmPassword: Joi.ref('password')
    });

    return schema.validate({
        name,
        email,
        password,
        confirmPassword
    });
}

const User =  mongoose.model('User', userSchema);

module.exports = {
    User,
    validateUser
}