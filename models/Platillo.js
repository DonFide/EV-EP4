const { Schema, model } = require('mongoose') 

const platilloSchema = new Schema({
    nombre: {
        type:String,
        require:true
    },
    ingredientes:{
        type:String,
        require:true
    }, 
    precio: {
        type:Number,
        require:true
    },
    imagen: {
        type:String,
        default:"default.png"
    },
    estado: {
        type: Boolean,
        default: true
    }
})

 

module.exports = model('Platillo', platilloSchema)