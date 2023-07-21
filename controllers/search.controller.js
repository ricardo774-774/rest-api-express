const { response, request } = require('express');

const { 
    searchUsers,
    searchProducts,
    searchCategories
 } = require('../helpers/search.helper');

const allowedCollections = [
    'categories',
    'products',
    'roles',
    'users',
];

const search = (req = request, res = response) => {

    const { collection, term } = req.params;

    if (!allowedCollections.includes(collection)) {
        return res.status(400).json({
            msg: `Allowed Collections Are: ${allowedCollections}`
        });
    }

    switch (collection) {
        case 'categories':
            searchCategories(term, res);
        break;

        case 'products':
            searchProducts(term, res);
        break;

        case 'users':
            searchUsers(term, res);
        break;

        default: 
            res.status(500).json({
                msg: 'In Proccess'
            })
        break;
    }

}

module.exports = {
    search,
}