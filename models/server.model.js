const express = require('express');
var cors = require('cors');
const { dbConnection } = require('../db/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

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
        this.app.use(this.usersPath, require('../routes/user.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        });
    }

};

module.exports = Server;