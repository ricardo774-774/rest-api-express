const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = (
    files, 
    validExtensions = ['png', 'jpg', 'jpeg', 'gif'],
    folder = ''
) => {
    return new Promise((resolve, reject) => {

        const { file } = files;
        const shortName = file.name.split('.');
        const extension = shortName[shortName.length - 1];

        // Extension Validator
        if (!validExtensions.includes(extension)) {
            reject(`Invalid extension file. Only: (${validExtensions})`);
            return;
        }

        // Rename with uuidv4
        const tempName = uuidv4() + '.' + extension;

        // Saving in folder uploads
        const uploadPath = path.join( __dirname, '../uploads/',folder ,tempName );

        file.mv(uploadPath, (err) => {
            if (err) {
                reject(err);
            }

            // All works good
            resolve(tempName);
        });

    });
}

module.exports = {
    uploadFile
}