const { Router } = require('express');
const { check } = require('express-validator');

const { 
    createCategory, 
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
} = require('../controllers/categories.controller');
const { validatorJWT, validator, hasRole } = require('../middlewares');
const { categoryIdExist } = require('../helpers/db-validator.helper');

const router = Router();

// Get a categories
router.get('/', getCategories);

// Get a category by id (public)
router.get('/:id', [
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => categoryIdExist(id) ),
    validator
], getCategoryById );

// Create category (private access token)
router.post('', [
    validatorJWT,
    check('name', 'Name Is Required').not().isEmpty(),
    check('name', 'Name Is Not Valid').isString(),
    validator
], createCategory );

// Update category by id (private access token)
router.put('/:id', [
    validatorJWT,
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => categoryIdExist(id) ),
    check('name', 'Name Is Required').not().isEmpty(),
    check('name', 'Name Is Not Valid').isString(),
    validator
], updateCategory );

// Delete category (private admin)
router.delete('/:id', [
    validatorJWT,
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => categoryIdExist(id) ),
    hasRole('ADMIN_ROLE'),
    validator
], deleteCategory );

module.exports = router;