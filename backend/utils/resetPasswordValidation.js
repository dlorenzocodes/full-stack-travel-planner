const Joi = require('joi');

const validateResetPassword = (body) => {
    const schema = Joi.object({
        token: Joi.string(),
        id: Joi.string(),
        password: Joi.string()
            .trim()
            .min(8)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)
            .required(),
        confirmPassword: Joi.ref('password')
    });

    return schema.validate(body)
}

module.exports = { validateResetPassword }