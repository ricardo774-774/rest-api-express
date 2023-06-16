const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect( process.env.URLMONGODB );
        console.log('Database Connection Successful');

    } catch (error) {

        console.log(error);
        throw new Error('Error MongoDB Connection');

    }

}


module.exports = {
    dbConnection,
}