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
        cb(null, false);
    }
};

const profileUpload = multer(
    { 
        storage, 
        fileFilter, 
        limits: { fileSize: 100000 }
    }
).single('avatar');

const multerErrorHandeling = (req, res, next) => {
    profileUpload(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            if(err.code === 'LIMIT_UNEXPECTED_FILE'){
                res.status(400).json({ message: 'Only single file upload is allowed!' })
            } else if( err.code === 'LIMIT_FILE_SIZE'){
                res.status(400).json({ message: 'File is too large. Please make sure it is 1kb or less!' })
            }
        } else{
            next(err)
        }
    });
};


router.post('/', validate(validateUser), registerUser);

router.post('/login', validate(validateUserLogin), loginUser);

router.get('/me',protectPrivateRoutes, getCurrentUser);

router.get('/logout', handleUserLogout);

router.post('/profile', protectPrivateRoutes, multerErrorHandeling, getProfileImage);

router.delete('/profile/delete', protectPrivateRoutes, deleteProfileImage);

module.exports = router;