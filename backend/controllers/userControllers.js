const User = require('../models/userModel');
const bcrypt = require('bcrypt');


// @desc   Login a user
// @route  /api/users
// @access Public
const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try{
        const user = await User.findOne({ email });

        if(user && (await bcrypt.compare(password, user.password))){
            const token = user.generateToken();
            res.cookie('jwt', token, { httpOnly: true, maxAge: process.env.MAXAGE * 1000 });
            res.status(200).json({ id: user._id, name: user.name });
        } else{
            res.status(401);
            throw new Error('Invalid credentials')
        }
   }catch(err){
       res.send(err.message);
   }
};



// @desc   Register a new user. On success redirects user to login
// @route  /api/users
// @access Public
const registerUser = async (req, res) => {
    const { name, email, password, confirmPassword } = req.body;

    if(password !== confirmPassword) return res.send('Passwords do not match');

    try{

        const existingUser = await User.findOne({email});

         // maybe sent an email about why account was not created
        if(existingUser) {
            res.status(400);
            throw new Error('User already exists');
        }

        // Hash password
        const salt = await bcrypt.genSalt(12);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword
        });

        if(newUser) res.status(201).send('User created');

    }catch(error){
        console.log(error);
        res.send(error)
    }
};

module.exports = {
    loginUser,
    registerUser
}