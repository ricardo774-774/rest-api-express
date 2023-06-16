const { validationResult } = require("express-validator");

// Controll error from routes validator
const validator = ( req, res, next ) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(400).json(errors);
    }

    next();
}

module.exports = {
    validator,
}