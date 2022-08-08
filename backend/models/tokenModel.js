const moongose = require('mongoose');

const tokenSchema = moongose.Schema({
    userId: {
        type: moongose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now(),
        expires: 900
    }
});

const Token = moongose.model('Token', tokenSchema);

module.exports = { Token }