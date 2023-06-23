const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user.model');

const getUsers = async(req = request, res = response) => {
    const { skip = 0, limit = 5 } = req.query;

    // Get users with pagination
    // const users = await User.find({ state: true })
    //     .skip(skip)
    //     .limit(limit)
    //Get count of users with state in true
    //const count = await User.countDocuments({ state: true });

    const [ count, users ] = await Promise.all([
        User.count({ state: true }),
        User.find({ state: true })
            .skip(skip)
            .limit(limit)
    ]);

    res.json({
        count,
        users
    })
};

const createUser = async (req = request, res = response) => {
    // Destructuring will save only this 4 variables
    const { name, email, password, role } = req.body;
    const user = new User({ name, email, password, role });

    // Password encryption
    const salt = bcryptjs.genSaltSync();
    user.password = bcryptjs.hashSync( password, salt );

    // Save in DB
    await user.save();

    res.json({
        msg: '¡User Created!',
        user,
    });
};

const updateUser = async(req = request, res = response) => {
    const { id } = req.params;
    const { _id, password, google, email, ...rest } = req.body;

    if (password) {
        // Password encryption
        const salt = bcryptjs.genSaltSync();
        rest.password = bcryptjs.hashSync( password, salt );
    }

    const userDB = await User.findByIdAndUpdate( id, rest, {new: true} );

    res.json({
        msg: '¡User Updated!',
        userDB
    })
};

const deleteUser = async(req = request, res = response) => {
    const { id } = req.params;

    // Delete a file permanently
    // await User.findByIdAndDelete( id );

    // Changing the state makes the user "inactive"
    const user = await User.findByIdAndUpdate( id, {state: false}, {new: true} );

    // const userAuth
    const userAuth = req.user;

    res.json({
        msg: `¡User ${id} Deleted!`,
        user,
        userAuth
    });
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}