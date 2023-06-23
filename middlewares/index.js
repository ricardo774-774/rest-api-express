

const validatorJWT = require('./validator-jwt.middleware');
const validatorRole = require('./validator-rol.moddleware');
const validator = require('./validator.middleware');

module.exports = {
    ...validator,
    ...validatorJWT,
    ...validatorRole
}