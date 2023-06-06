const { response, request } = require('express');

const getUsers = (req = request, res = response) => {
    // Gettin request query
    const { name = 'No Name', lastname = 'No Lastname'} = req.query;
    res.json({
        msg: 'Get From Api',
        name,
        lastname
    })
};

const createUser = (req = request, res = response) => {
    // Gettin request body
    const { name, desc } = req.body;
    res.json({
        msg: 'Post From Api',
        name,
        desc
    })
};

const updateUser = (req = request, res = response) => {
    res.json({
        msg: 'Put From Api'
    })
};

const deleteUser = (req = request, res = response) => {
    // Gettin request params
    const id = req.params.id;
    res.json({
        msg: `User ${id} Delete From Api`
    })
};

module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser
}