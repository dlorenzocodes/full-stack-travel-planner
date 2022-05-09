const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
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


module.exports = mongoose.model('User', userSchema);