const { Schema, model } = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'Rol is required']
    }
});

module.exports = model( 'Role', RoleSchema )