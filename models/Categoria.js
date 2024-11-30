const { Schema, model } = require('mongoose') 

const categoriaSchema = new Schema({
    nombre: {
        type:String,
        require:true
    },
    descripcion: {
        type:String,
        require:true
    },
    estado: {
        type: Boolean,
        default: true
    }
})
 

module.exports = model('Categoria', categoriaSchema)
 