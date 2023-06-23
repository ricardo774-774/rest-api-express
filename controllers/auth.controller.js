const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user.model');
const { createJWT } =  require('../helpers/generate-jwt.helper');

const login = async(req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Email exist in db
        const user = await User.findOne({ email });
        if( !user ){
            return res.status(400).json({
                msg: 'User or Password incorrects - email'
            });
        }

        // User is active
        if( user.state === false ){
            return res.status(400).json({
                msg: 'User or Password incorrects - state:false'
            });
        }

        // Compare password
        const userPassword = bcryptjs.compareSync( password, user.password );
        if(!userPassword){
            return res.status(400).json({
                msg: 'User or Password incorrects - password'
            });
        }

        // Create JWT
        const token = await createJWT( user.id );

        res.json({
            msg: 'Login ok',
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error, ask the developer'
        });
    }

};

module.exports = {
    login
}