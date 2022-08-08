const { validationResult } = require('express-validator');

const validateRequestTripSchema = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        res.status(400);
        throw new Error('Unabled to save your trip. Please make sure all fields are filled correctly!')
    }
    next();
}

module.exports = { validateRequestTripSchema };