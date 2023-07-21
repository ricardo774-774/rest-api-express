const { response, request } = require('express');
const { Category } = require('../models');

// Ready
const getCategories = async(req = request, res = response) => {

    const { skip = 0, limit = 5 } = req.query;

    const [ count, categories ] = await Promise.all([
        Category.count({ state: true }),
        Category.find({ state: true })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name')
    ]);

    return res.json({
        count,
        categories
    })
}

// getCategory by id - populate (info padre)
const getCategoryById = async(req = request, res = response) => {
    
    const { id } = req.params;

    const category = await Category
        .findById(id)
        .populate('user');

    return res.json({
        category
    })
}

const createCategory = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();

    // validation Category Already Exist
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
        return res.status(400).json({
            msg: 'Category Already Exist'
        });
    }

    // save in db
    const data = {
        name, 
        user: req.user._id
    }
    const category = new Category( data );
    await category.save();

    return res.status(201).json({
        msg: 'Category Created!',
        category
    });
}

// updateCategory 
const updateCategory = async(req = request, res = response) => {

    const { id } = req.params;

    const name = req.body.name.toUpperCase();

    // validation Category Already Exist
    const categoryDB = await Category.findOne({ name });
    if (categoryDB) {
        return res.status(400).json({
            msg: 'Category Already Exist'
        });
    }

    const category = await Category.findByIdAndUpdate( id, {name: name}, {new: true} );

    return res.status(200).json({
        msg: 'Category updated successfully',
        category
    });
}

// deleteCategory - state: false
const deleteCategory = async(req = request, res = response) => {

    const { id } = req.params;

    await Category.findByIdAndUpdate( id, {state: false}, {new: true} );

    return res.status(200).json({
        msg: 'Category deleted successfully',
    });
}

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
}