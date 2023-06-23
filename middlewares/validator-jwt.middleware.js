const { response, request } = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validatorJWT = async(req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'Token is lost'
        });
    }

    try {
        // get uid from token auth
        const { uid } = jwt.verify(token, process.env.SECRETKEY);

        const user = await User.findById( uid );

        // user not found
        if (!user) {
            return res.status(400).json({
                msg: 'Admin Not Found'
            });
        }

        // user status false
        if (!user.state) {
            return res.status(401).json({
                msg: 'Admin status is false'
            });
        }

        // save user auth in request
        req.user = user;

        next();
        
    } catch (error) {
        console.log(error);
        return res.status(401).json({
            msg: 'Token is not valid'
        });
    }

}

module.exports =  {
    validatorJWT,
}