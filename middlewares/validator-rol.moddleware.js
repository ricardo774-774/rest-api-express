const { response, request } = require('express');

const adminRole = (req = request, res = response, next) => {

    if ( !req.user ) {
        return res.status(500).json({
            msg: 'validate token before role'
        });
    }
    
    const { role, name } = req.user;

    if ( role !== 'ADMIN_ROLE' ) {
        return res.status(401).json({
            msg: `${name} is not an admin`
        });
    }

    next();
}

const hasRole = ( ...roles ) => {

    return (req = request, res = response, next) => {
        if ( !req.user ) {
            return res.status(500).json({
                msg: 'validate token before role'
            });
        }

        const { role, name } = req.user;

        if ( !roles.includes(role) ) {
            return res.status(401).json({
                msg: `${name} has not a role allowed`
            });
        }

        next();

    }
}

module.exports = {
    adminRole,
    hasRole
}