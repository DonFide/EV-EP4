const Platillo = require('../models/Platillo') 
const Orden = require('../models/Orden') 


exports.crearOrden = async  (req, res) => {
    try{
        const { idmesa,platillos,estado} = req.body 
        console.log(req.body )
           if(!idmesa|| !platillos ){
               return  res.status(400).send('Faltan datos')
           }
         
           const orden=new Orden({
            idmesa,
               platillos,
               estado
           })
           
           await orden.save()
           
           return res.status(200).json({
               status:"exito",
               mensaje:"Orden creada con exito",
               orden
           })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en crear orden" 
        })
    }

}

exports.listarOrden = async (req, res) => {
    try{ 
        const orden = await Orden.find()
        console.log('Ordenes encontrados:', orden);
        if (!orden || orden.length === 0) {
            return res.json({
                status: "error",
                mensaje: "No hay ordenes que listar",
                orden
            });
        }
        return res.status(200).json({
            status:"exito",
            mensaje:"Orden encontrado",
            orden
        }) 
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en listar mesero" 
        })
    }
}

exports.buscarOrden = async (req, res) => {
    try{
        const { idOrden } = req.params 
        if(!idOrden) {
            return  res.status(400).send('Faltan datos')
        }
        const orden = await Orden.findById(idOrden)
         
        return res.status(200).json({
            status:"exito",
            mensaje:"Orden encontrada",
            orden
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en buscar orden" 
        })
    }

}
exports.buscarMesa = async (req, res) => {
    try{
        const { idmesa } = req.params  
        if(!idmesa) {
            return  res.status(400).send('Faltan datos')
        }
        const orden = await Orden.findOne({ idmesa }).populate('platillos.platillo');;
        console.log(orden)
         
        return res.status(200).json({
            status:"exito",
            mensaje:"Orden encontrada",
            orden
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en buscar orden" 
        })
    }

}
exports.actualizarOrden = async (req, res) => {
    try{

        const { idOrden }= req.params
        const ordenActualizado = req.body
        console.log("id de la orden: ",idOrden)
        console.log("orden actualizados: ", ordenActualizado)
        const orden = await Orden.findByIdAndUpdate(idOrden, ordenActualizado,{ new:true })

        if(!orden){
            return res.status(404).send({
                status:"error",
                message:"No se ha actualizado la orden"
             })
        }
         
        
        return res.status(200).json({
            status:"exito",
            mensaje:"Orden actualizada",
            orden
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en actualizar la orden" 
        })
    }

}

exports.eliminarOrden = async (req, res) => {
    try{
        const { idOrden }= req.params 
        const ordeEliminada = await Orden.findByIdAndDelete(idOrden);
         
        if(!ordeEliminada){
            return res.status(404).send({
                status:"error",
                message:"No se ha encontrado la orden"
             })
        }    
        return res.status(200).json({
            status:"exito",
            mensaje:"Orden Eliminada",
            ordeEliminada
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en eliminar orden" 
        })
    }

}