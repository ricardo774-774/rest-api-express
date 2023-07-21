const { Router } = require('express');
const { check } = require('express-validator');

const { 
    roleType, 
    emailExist, 
    userIdExist 
} = require('../helpers/db-validator.helper');

const { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser
} = require('../controllers/user.controller');

// const { validator } = require('../middlewares/validator.middleware');
// const { validatorJWT } = require('../middlewares/validator-jwt.middleware');
// const { adminRole, hasRole } = require('../middlewares/validator-rol.moddleware');

const {
    validator,
    validatorJWT,
    hasRole
} = require('../middlewares/index');

const router = Router();

router.get('/', getUsers);

router.post('/', [
    check('name', 'Name is required').not().isEmpty(),
    check('password', 'Password must be longer than 6 characters').isLength({ min: 6 }),
    check('email', 'Email is not valid').isEmail(),
    check('email').custom( (email) => emailExist(email) ),
    // check('role', 'That role is not allowed').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom( (role) => roleType(role) ),
    validator
], createUser);

router.put('/:id', [
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => userIdExist(id) ),
    check('role').custom( (role) => roleType(role) ),
    validator
], updateUser);

router.delete('/:id', [
    validatorJWT,
    // adminRole,
    hasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'Id is not a MongoId').isMongoId(),
    check('id').custom( (id) => userIdExist(id) ),
    validator
], deleteUser);

module.exports = router;