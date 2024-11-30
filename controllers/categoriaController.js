const Categoria = require('../models/Categoria') 

exports.crearCategoria = async (req, res) => {
    try{

        const { nombre, descripcion  } = req.body;
        if(!nombre|| !descripcion ){
            return  res.status(400).send('Faltan datos')
        }
        const categoria =new Categoria({
            nombre,
            descripcion
        })
        
        await categoria.save()
        
        return res.status(200).json(categoria)
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en crear categoria" 
        })
    }
}

exports.listarCategoria = async (req, res) => {
    try{ 
        const categoria = await Categoria.find()

        if (!categoria || categoria.length === 0) {
            return res.json({
                status: "error",
                mensaje: "No hay categorias",
                categoria
            });
        }
        return res.status(200).json({
            status:"exito",
            mensaje:"Categoria encontrada",
            categoria
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en listar categoria" 
        })
    }

}

exports.buscarCategoria = async (req, res) => {
    try{
        const { id } = req.params 
        console.log(id)
        if(!id){
            return  res.status(400).send('Faltan datos')
        }
        const categoria = await Categoria.findById(id)
         
        return res.status(200).json({
            status:"exito",
            mensaje:"Categoria encontrado",
            categoria
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en buscar la categoria" 
        })
    }

}

exports.actualizarCategoria = async  (req, res) => {
    try{

        const { id }= req.params
        const categoriaActualizado = req.body
        console.log("id de categoria: ",id);
        console.log("new datos categoria: ",categoriaActualizado);
        const categoria = await Categoria.findByIdAndUpdate(id, categoriaActualizado,{ new:true })
        if(!categoria){
            return res.status(404).send({
                status:"error",
                message:"No se ha actualizado la categoria"
             })
        }
        return res.status(200).json({
            status:"exito",
            mensaje:"Categoria actualizada",
            categoria
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en actualizar categoria" 
        })
    }

}

exports.eliminarCategoria = async (req, res) => {
    try{
        const { idCategoria }= req.params 
        const categoriaEliminada = await Categoria.findByIdAndDelete(idCategoria);
         
 
        if(!categoriaEliminada){
            return res.status(404).send({
                status:"error",
                message:"No se ha encontrado la categoria"
             })
        }   
        return res.status(200).json({
            status:"exito",
            mensaje:"Categoria Eliminada",
            categoriaEliminada
        }) 
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en eliminar categoria" 
        })
    }

}