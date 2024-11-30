const { Schema, model } = require('mongoose') 

const clienteSchema = new Schema({
    nombre: {
        type: String,
        require: true
    },
    dni: {
        type: Number,
        require: true
    },
    telefono: {
        type: Number,
        require: true
    },
    correo: {
        type: String,
        require: true
    },
    estado: {
        type: Boolean,
        default: true
    }
})
 

module.exports = model('Cliente', clienteSchema)
 