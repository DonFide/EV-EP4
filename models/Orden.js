const { Schema, model } = require('mongoose') 

const ordenSchema = new Schema({
    idmesa:{
        type:Number,
        require: true
    }, 
    platillos: [
        {
            platillo: {
                 type:Schema.ObjectId,
                ref:"Platillo",
                required: true,
            },
            cantidad: {
                type: Number,
                min: 1,
                required: true,
            },
        },
    ], 
    estado: {
         type: String,
        default:"pendiente"
    }
})

 

module.exports = model('Orden', ordenSchema)