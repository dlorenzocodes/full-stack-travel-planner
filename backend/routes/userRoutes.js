const express = require('express');
const router = express.Router();
const multer = require('multer');
const validate = require('../middleware/validate');
const { protectPrivateRoutes } = require('../middleware/authMiddleware');
const { validateUser, validateUserLogin } = require('../models/userModel');
const { 
    loginUser, 
    registerUser, 
    getCurrentUser,
    handleUserLogout,
    getProfileImage,
    deleteProfileImage
} = require('../controllers/userControllers');

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
    if(file.mimetype.split("/")[0] === 'image'){
        cb(null, true);
    } else{
        cb(new Error('File must be an image!'), false);
    }
};

const profileUpload = multer({ storage, fileFilter, limits: { fileSize: 1000000 }});


router.post('/', validate(validateUser), registerUser);

router.post('/login', validate(validateUserLogin), loginUser);

router.get('/me',protectPrivateRoutes, getCurrentUser);

router.get('/logout', handleUserLogout);

router.post('/profile', protectPrivateRoutes, profileUpload.single('avatar'), getProfileImage);

router.delete('/profile/delete', protectPrivateRoutes, deleteProfileImage);

module.exports = router;