const Joi = require('joi');

const validateCityEntry = (city) => {
    const schema = Joi.object({
        city: Joi.string()
        .trim()
        .pattern(/^[A-Za-z\s\.]+$/)
        .required()
    });

    return schema.validate(city)
}

module.exports = {
    validateCityEntry
}