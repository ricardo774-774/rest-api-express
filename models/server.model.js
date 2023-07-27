const express = require('express');
var cors = require('cors');
const fileUpload = require('express-fileupload');
const { dbConnection } = require('../db/config.db');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth',
            categories: '/api/categories',
            products:   '/api/products',
            searches:   '/api/search',
            uploads:    '/api/uploads',
            users:      '/api/users',
        }

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

        // File Upload
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes() {
        this.app.use(this.paths.auth, require('../routes/auth.route'));
        this.app.use(this.paths.categories, require('../routes/categories.route'));
        this.app.use(this.paths.products, require('../routes/products.route'));
        this.app.use(this.paths.searches, require('../routes/search.route'));
        this.app.use(this.paths.uploads, require('../routes/uploads.route'));
        this.app.use(this.paths.users, require('../routes/user.route'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on port ${this.port}`)
        });
    }

};

module.exports = Server;