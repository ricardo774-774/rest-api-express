const { 
    Category, 
    Role, 
    User,
    Product
} = require('../models');

// Check that the role they sent us exists in the database
const roleType = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if ( !roleExist ) {
        throw new Error(`Role ${role}, is not allowed`);
    }
}

// Check that the email does not exist yet in the database
const emailExist =  async(email = '') => {
    const emailFound = await User.findOne({ email });
    if ( emailFound ) {
        throw new Error(`Email ${email}, has already been registered`);
    }
}

// Check that the id exist in db
const userIdExist = async(_id = '') => {
    const idFound = await User.findById(_id);
    if ( !idFound ) {
        throw new Error(`Id ${_id}, does not exist`);
    }

    if (!idFound.state) {
        throw new Error(`Item ${_id}, was deleted`);
    }
}

const categoryIdExist = async(_id = '') => {
    const idFound = await Category.findById(_id)
    if ( !idFound ) {
        throw new Error(`Id ${_id}, does not exist`);
    }

    if (!idFound.state) {
        throw new Error(`Item ${_id}, was deleted`);
    }
}

const productIdExist = async(_id = '') => {
    const idFound = await Product.findById(_id)
    if ( !idFound ) {
        throw new Error(`Id ${_id}, does not exist`);
    }

    if (!idFound.state) {
        throw new Error(`Item ${_id}, was deleted`);
    }
}

module.exports = {
    roleType,
    emailExist,
    userIdExist,
    categoryIdExist,
    productIdExist
}