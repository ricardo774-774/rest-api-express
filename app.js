require('dotenv').config();
const Server = require('./models/server.model.js');

const server = new Server();

server.listen();