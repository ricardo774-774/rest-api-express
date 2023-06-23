const jwt = require('jsonwebtoken');

const createJWT = (uid = '') => {

    return new Promise((resolve, reject) => {

        const paylod = { uid };

        jwt.sign( paylod, process.env.SECRETKEY, {
            expiresIn: '4h'
        }, ( err, token ) => {
            if(err){
                console.log(err);
                reject('error creating the webtokwn');
            } else {
                resolve( token );
            }
        });
    });

}

module.exports = {
    createJWT
}