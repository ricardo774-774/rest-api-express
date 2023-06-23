const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.key = process.env.SECRETKEY;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Database Connection
        this.connectionDB();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async connectionDB() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Read And Parse Body
        this.app.use(express.json());

        // Public Directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth.route'));
        this.app.use(this.usersPath, require('../routes/user.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
            console.log(`App key ${this.key}`)
        });
    }

};

module.exports = Server;