const jwt = require('jsonwebtoken');

const protectPrivateRoutes = (req, res, next) => {
    const token = req.cookies.jwt;

    try{
        if(token){
            try{
                const decoded = jwt.verify(token, process.env.JWT_SIGNATURE);
                req.user = decoded;
                next();
            }catch(err){
                res.status(401);
                throw new Error('No enough permissions to perform this action!')
            }
        } 
        else {
            res.status(401);
            throw new Error('No enough permissions to perform this action!')
        }

    }catch(err){
        next(err);
    }
}

module.exports = { protectPrivateRoutes };