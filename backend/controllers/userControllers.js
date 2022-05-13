const { User } = require('../models/userModel');
const bcrypt = require('bcrypt');

const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production' ? true : false,
    sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
    maxAge: process.env.MAXAGE * 1000 
}

// @desc   Login a user
// @route  /api/users
// @access Public
const loginUser = async (req, res, next) => {
   const { email, password } = req.body;

   try{
        const user = await User.findOne({ email });
        console.log(user)

        if(user && (await bcrypt.compare(password, user.password))){
            const token = user.generateToken();
            res.cookie('jwt', token, cookieOptions);
            res.status(200).json({ id: user._id, name: user.name });
        } else{
            res.status(401);
            throw new Error('Invalid credentials')
        }
   }catch(err){
       next(err);
   }
};



// @desc   Register a new user. On success redirects user to login
// @route  /api/users
// @access Public
const registerUser = async (req, res, next) => {
    const { name, email, password, confirmPassword } = req.body;

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

        if(newUser) res.status(201).send('Account successfully created. Log in!');

    }catch(err){
        next(err)
    }
};

module.exports = {
    loginUser,
    registerUser
}