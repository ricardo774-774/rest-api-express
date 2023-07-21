const { response } = require('express');
const { ObjectId } = require('mongoose').Types;

const { 
    Category, 
    Product, 
    User
} = require('../models');

const searchUsers = async(term='', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    // Search by UserId 
    if (isMongoId) {
        const user = await User.findById(term);
        return res.json({
            results: (user) ? [user] : []
        });
    }

    // Exrpesion regular para insensibilizar busqueda en db 
    const regex = new RegExp( term, 'i' );

    // Search by name or by email and state in true
    const users = await User.find({
        $or: [{name: regex}, {email: regex}],
        $and: [{state:true}]
    });

    return res.json({
        results: users
    });

}

const searchProducts = async(term='', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    // Search by Id 
    if (isMongoId) {
        // ProductId
        const product = await Product.findById(term);
        if (product) return res.json({
            results: [product] 
        });

        // UserId
        const user = await Product.find({user: term});
        if (user.length > 0) return res.json({ 
            results: [user]
        });

        //  CategoryId
        const category = await Product.find({category: term});
        if (category) return res.json({ 
            results: [category] 
        })
    }

    // Search by name
    const regex = new RegExp( term, 'i' );
    const products = await Product.find({name: regex});
    return res.json({
        results: products
    });
}

const searchCategories = async(term='', res = response) => {
    const isMongoId = ObjectId.isValid(term);

    // Search by Id 
    if (isMongoId) {
        //  CategoryId
        const category = await Category.findById(term);
        if (category) return res.json({ 
            results: [category] 
        })

        // UserId
        const user = await Category.find({user: term});
        if (user) return res.json({ 
            results: [user]
        });
    }

    // Search by name
    const regex = new RegExp( term, 'i' );
    const categories = await Category.find({name: regex});
    return res.json({
        results: categories
    });

}

module.exports = {
    searchUsers,
    searchProducts,
    searchCategories
}