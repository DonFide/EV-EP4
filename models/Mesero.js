const { Schema, model } = require('mongoose') 
const bcrypt=require('bcryptjs')

const meseroSchema = new Schema({
    nombre: {
        type:String,
        require:true
    },
    dni: {
        type:Number,
        require:true
    },
    telefono: {
        type:Number,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    estado:{ 
        type: Boolean,
        default: true 
    }
})
 
meseroSchema.methods.encryptPassword = async (password) => {
    const salt =bcrypt.genSaltSync(7)
    return bcrypt.hash(password, salt)
}

meseroSchema.methods.validatePassword = function (password) {
    return bcrypt.compare(password, this.password)
}
module.exports = model('Mesero', meseroSchema)
 