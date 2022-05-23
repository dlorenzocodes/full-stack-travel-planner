const validate = (validator) => {
    return (req, res, next) => {
        const { error } = validator(req.body);
        if (error) {
            console.log(error)
            return res.status(400).send(error.message)
        }
        next();
    }
}

module.exports = validate;