const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User =  require('../models/user.model');
const { createJWT } =  require('../helpers/generate-jwt.helper');
const { googleVerify } =  require('../helpers/google-verify');

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

const googleSignIn = async(req = request, res = response) => {

    const { id_token } = req.body;

    try {
        const {name, email, img} = await googleVerify(id_token);

        // Search user in db
        let user = await User.findOne({ email });

        if (!user) {
            // create user
            const data = {
                name,
                email,
                password: 'password',
                img,
                role: 'USER_ROLE',
                google: true,
            };

            // save new user
            user = new User(data);
            await user.save();
        }

        // Check user status
        if (!user.state) {
            return res.status(401).json({
                msg: 'user status in false'
            })
        }

        // Generate JWT
        const token = await createJWT( user.id );

        res.json({
            msg: 'Process Successfull',
            user,
            token
        })

    } catch (error) {
        console.log('Error Google Token', error);
    }
}

module.exports = {
    login,
    googleSignIn
}