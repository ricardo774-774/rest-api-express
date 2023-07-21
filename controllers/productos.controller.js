const { response, request } = require('express');
const { Product } = require('../models');

const getProducts = async(req = request, res = response) => {
    const { skip = 0, limit = 5 } = req.query;

    const [ count, products ] = await Promise.all([
        Product.count({ state: true }),
        Product.find({ state: true })
            .skip(skip)
            .limit(limit)
            .populate('user', 'name')
            .populate('category', 'name')
    ]);

    return res.json({
        count,
        products
    })
}

const getProductById = async(req = request, res = response) => {
    const { id } = req.params;

    const category = await Product
        .findById(id)
        .populate('user', 'name')
        .populate('category', 'name')

    return res.json({
        category
    })
}

const createProduct = async(req = request, res = response) => {
    const name = req.body.name.toUpperCase();
    const { ...rest } = req.body;

    // validation product Already Exist
    const productDB = await Product.findOne({ name });
    if (productDB) {
        return res.status(400).json({
            msg: 'Product Name Already Exist'
        });
    }

    // save in db
    const data = {
        ...rest,
        name,
        user: req.user._id,
    }

    const product = new Product( data );
    await product.save();

    return res.status(201).json({
        msg: 'Product Created!',
        product
    });

}

const updateProducts = async(req = request, res = response) => {
    const { state, user , ...rest } = req.body
    const { id } = req.params;

    if(rest.name){
        rest.name = rest.name.toUpperCase();
        const name = rest.name;

        // validation product Already Exist
        const productDB = await Product.findOne({ name });
        if (productDB) {
            return res.status(500).json({
                msg: 'Product Name Already Exist'
            });
        }
    }

    const product = await Product.findByIdAndUpdate( 
        id, 
        rest, 
        {new: true} );

    return res.status(200).json({
        msg: 'Product updated successfully',
        product
    });
}

const deleteProduct = async(req = request, res = response) => {
    const { id } = req.params;

    await Product.findByIdAndUpdate( id, {state: false}, {new: true} );

    return res.status(200).json({
        msg: 'Product deleted successfully',
    });
}

module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProducts,
    deleteProduct
}