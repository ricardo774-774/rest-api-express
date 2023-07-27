

const validator = require('./validator.middleware');
const validatorFile = require('./validator-file.middleware')
const validatorJWT = require('./validator-jwt.middleware');
const validatorRole = require('./validator-rol.moddleware');

module.exports = {
    ...validator,
    ...validatorFile,
    ...validatorJWT,
    ...validatorRole,
}