const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validatorJWT, 
    validator,
} = require('../middlewares');
const { 
    categoryIdExist, 
    productIdExist
} = require('../helpers/db-validator.helper');
const { 
    createProduct, 
    getProducts, 
    getProductById, 
    updateProducts,
    deleteProduct
} = require('../controllers/productos.controller');

const router = Router();

// Get products
router.get('/', getProducts );

// Get a product by id (public)
router.get('/:id',[
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => productIdExist(id) ),
    validator
], getProductById );

// Create product (private access token)
router.post('/',[
    validatorJWT,
    check('name', 'Name Is Required').not().isEmpty(),
    check('name', 'Name Is Not Valid').isString(),
    check('category', 'Category Is Required').not().isEmpty(),
    check('category', 'Category is not a MongoId').isMongoId(),
    check('category').custom( (id) => categoryIdExist(id) ),
    validator
], createProduct );

// Update product by id (private access token)
router.put('/:id', [
    validatorJWT,
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => productIdExist(id) ),
    validator
], updateProducts );


// Delete product (private admin)

router.delete('/:id',[
    validatorJWT,
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => productIdExist(id) ),
    validator
], deleteProduct );

module.exports = router;