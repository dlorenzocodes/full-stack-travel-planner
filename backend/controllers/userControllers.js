



const loginUser = (req, res) => {
    res.send('Login');
};


const registerUser = (req, res) => {
    res.send('Register');
};

module.exports = {
    loginUser,
    registerUser
}