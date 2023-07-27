const { Router } = require('express');
const { check } = require('express-validator');

const { 
    validator,
    validatorFile,
} = require('../middlewares');
const { 
    loadFile, 
    updateImg, 
    getImg,
    updateImgCloudinary,
} = require('../controllers/uploads.controller');
const { collectionValid } = require('../helpers/db-validator.helper');

const router = Router();

router.post('/', validatorFile ,loadFile);

router.put('/:collection/:id', [
    validatorFile,
    check('id', 'Id is not a MongoId').isMongoId(),
    check('collection').custom( c => collectionValid( c, ['users', 'products'])),
    validator
], updateImgCloudinary ); //updateImg

router.get('/:collection/:id', [
    check('id', 'Id is not a MongoId').isMongoId(),
    check('collection').custom( c => collectionValid( c, ['users', 'products'])),
    validator
], getImg );

module.exports = router;