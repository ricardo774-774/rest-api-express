const { 
    Category, 
    Role, 
    User,
    Product
} = require('../models');

// Check that role exists in the database
const roleType = async(role = '') => {
    const roleExist = await Role.findOne({ role });
    if ( !roleExist ) {
        throw new Error(`Role ${role}, is not allowed`);
    }
}

// Check that email does not exist yet in the database
const emailExist =  async(email = '') => {
    const emailFound = await User.findOne({ email });
    if ( emailFound ) {
        throw new Error(`Email ${email}, has already been registered`);
    }
}

// Check  userId exist in db
const userIdExist = async(_id = '') => {
    const idFound = await User.findById(_id);
    if ( !idFound ) {
        throw new Error(`Id ${_id}, does not exist`);
    }

    if (!idFound.state) {
        throw new Error(`Item ${_id}, was deleted`);
    }
}

// Check that category exist in db
const categoryIdExist = async(_id = '') => {
    const idFound = await Category.findById(_id)
    if ( !idFound ) {
        throw new Error(`Id ${_id}, does not exist`);
    }

    if (!idFound.state) {
        throw new Error(`Item ${_id}, was deleted`);
    }
}

// Check that product exist in db
const productIdExist = async(_id = '') => {
    const idFound = await Product.findById(_id)
    if ( !idFound ) {
        throw new Error(`Id ${_id}, does not exist`);
    }

    if (!idFound.state) {
        throw new Error(`Item ${_id}, was deleted`);
    }
}

const collectionValid = (collection = '', collections = []) => {
    const included = collections.includes(collection);

    if (!included) {
        throw new Error(`Collection ${collection} is not valid`);
    }

    return true;
}

module.exports = {
    roleType,
    emailExist,
    userIdExist,
    categoryIdExist,
    productIdExist,
    collectionValid
}