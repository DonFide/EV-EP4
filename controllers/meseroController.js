 
const Mesero = require('../models/Mesero') 
const jwt = require('jsonwebtoken')
const config = require('../config/global')

exports.crearMesero = async (req, res) => {
    try{

        const { nombre, dni, telefono, password } = req.body 
        if(!nombre|| !dni || !telefono || !password){
            return  res.status(400).send('Faltan datos')
        }
        const mesero =new Mesero({
            nombre,
            dni,
            telefono,
            password
        })
   
        mesero.password = await mesero.encryptPassword(mesero.password) 
        await mesero.save()

        const token = jwt.sign({ id:mesero._id }, config.secret,{
            expiresIn: 60*60*24
        })

        return res.status(200).json(mesero)
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en crear mesero" 
        })
    }

}
exports.listarMesero = async (req, res) => {
    try{ 
        const mesero = await Mesero.find({estado:true})
        if (!mesero || mesero.length === 0) {
            return res.json({
                status: "error",
                mensaje: "No hay meseros activos",
                mesero
            });
        }
        return res.status(200).json({
            status:"exito",
            mensaje:"Mesero encontrado",
            mesero
        }) 
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en listar mesero" 
        })
    }
}

exports.buscarMesero = async (req, res) => {
    try{
        const { idMesero } = req.params 
        console.log(idMesero)
        if(!idMesero){
            return  res.status(400).send('Faltan datos')
        }
        const mesero = await Mesero.findById(idMesero)
         
        return res.status(200).json({
            status:"exito",
            mensaje:"Mesero encontrado",
            mesero
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en buscar Mesero" 
        })
    }

}

exports.login= async  (req, res) => {
    try{

        const {correo, password } = req.body 
        if(!correo || !password){
            return  res.status(400).send('Faltan datos')
        }
        const mesero=await Mesero.findOne({correo:correo})

        if(!mesero){
            return res.status(401).json({
                status:"error",
                mensaje:"El usuario no existe" 
            })
        }
        const validContraseña=await mesero.validatePassword(password)
        if(!validContraseña){
            return res.status(401).json({
                status:"error",
                token:null 
            })
        }
        const token=jwt.sign({id:mesero._id},config.secret,{
            expiresIn:60*60*24
        })
 
        return res.status(200).json({
            status:"exito",
            mensaje:"Login",
            token
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en login" 
        })
    }

}

exports.actualizarMesero = async  (req, res) => {
    try{
        const { idMesero }= req.params
        const MeseroActualizado = req.body

        const mesero = await Mesero.findByIdAndUpdate(idMesero, MeseroActualizado,{ new:true })

        if(!mesero){
            return res.status(404).send({
                status:"error",
                message:"No se ha actualizado al mesero"
             })
        }
        return res.status(200).json({
            status:"exito",
            mensaje:"Mesero actualizado",
            mesero
        }) 
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en actualizar mesero" 
        })
    }

}

exports.eliminarMesero = async (req, res) => {
    try{
        const { idMesero } = req.params 
        const  meseroEliminado = await Mesero.findByIdAndUpdate(idMesero,{estado:false},{new:true});
         
        if(!meseroEliminado){
            return res.status(404).send({
                status:"error",
                message:"No se ha encontrado al mesero"
             })
        }  
        return res.status(200).json({
            status:"exito",
            mensaje:"Mesero eliminado",
            mesero:meseroEliminado
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en eliminar mesero" 
        })
    }

}