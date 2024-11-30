const Platillo = require('../models/Platillo') 
const Categoria = require('../models/Categoria') 


exports.crearPlatillo = async (req, res) => {
    try{
        const { nombre, precio, ingredientes, imagen } = req.body 
     
        if(!nombre|| !precio || !ingredientes) {
            return  res.status(400).send('Faltan datos')
        }
        const platillo =new Platillo({
            nombre,
            precio,
            ingredientes,
            imagen
        })
        
        await platillo.save()
        
        return res.status(200).json({
            status:"exito",
            mensaje:"Platillo creado con exito",
            platillo
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en crear platillo" 
        })
    }

}
exports.listarPlatillo = async (req, res) => {
    try {
        const platillo = await Platillo.find();
        console.log('Platillos encontrados:', platillo);

        if (!platillo || platillo.length === 0) {
            return res.json({
                status: "error",
                mensaje: "No hay platillo",
                platillo
            });
        }

        return res.status(200).json({
            status: "exito",
            mensaje: "Lista de platillo encontrada",
            platillo
        });

    } catch (error) {
        console.error('Error al listar platillo:', error);
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un problema en listar platillo"
        });
    }
};
 
exports.buscarPlatillo = async (req, res) => {
    try{
        const { idPlatillo } = req.params 
        if(!idPlatillo){
            return  res.status(400).send('Faltan datos')
        }
        const platillo = await Platillo.findById(idPlatillo)
         
        return res.status(200).json({
            status:"exito",
            mensaje:"Platillo encontrado",
            platillo
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en buscar platillo" 
        })
    }

}
exports.actualizarPlatillo = async (req, res) => {
    try{

        const { idPlatillo }= req.params
        const platilloActualizado = req.body

        const platillo=await Platillo.findByIdAndUpdate(idPlatillo, platilloActualizado,{ new:true })

        if(!platillo) {
            return res.status(404).send({
                status:"error",
                message:"No se ha actualizado el platillo"
             })
        }
         
        
        return res.status(200).json({
            status:"exito",
            mensaje:"Platillo actualizado",
            platillo
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en actualizar platillo" 
        })
    }

}

exports.eliminarPlatillo = async  (req, res) => {
    try{
        const { idPlatillo }= req.params 
        const platilloEliminado = await Platillo.findByIdAndDelete(idPlatillo);
         
        if(!platilloEliminado){
            return res.status(404).send({
                status:"error",
                message:"No se ha encontrado el platillo"
             })
        }   
        return res.status(200).json({
            status:"exito",
            mensaje:"Platillo Eliminado",
            platilloEliminado
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en eliminar platillo" 
        })
    }

}