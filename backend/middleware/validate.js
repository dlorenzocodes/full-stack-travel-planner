const validate = (validator) => {
    return (req, res, next) => {
        const { name, email, password, confirmPassword } = req.body;
        const { error } = validator(name, email, password, confirmPassword);
        if (error) {
            console.log(error)
            return res.status(400).send(error.message)
        }
        next();
    }
}

module.exports = validate;