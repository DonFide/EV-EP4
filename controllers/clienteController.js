const Cliente = require('../models/Cliente') 

exports.registrarCliente = async  (req, res) => {
    try{

        const { nombre, dni, correo, telefono } = req.body  
        if(!nombre|| !dni || !correo || !telefono){
            return  res.status(400).send('Faltan datos')
        }
        const cliente = new Cliente({
            nombre,
            dni,
            correo,
            telefono
        })
        await cliente.save()
        //const result = await Cliente.find()
        return res.status(200).json(cliente)
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en registra cliente" 
        })
    }

}
exports.listarCliente = async (req, res) => {
    try {
        console.log('Consultando la base de datos...');
        const cliente = await Cliente.find();
        console.log('Clientes encontrados:', cliente);

        if (!cliente || cliente.length === 0) {
            return res.json({
                status: "error",
                mensaje: "No hay clientes",
                cliente
            });
        }
        return res.status(200).json({
            status: "exito",
            mensaje: "Lista de clientes encontrada",
            cliente
        });

    } catch (error) {
        console.error('Error al listar clientes:', error);
        return res.status(500).json({
            status: "error",
            mensaje: "Ha ocurrido un problema en listar cliente"
        });
    }
};


exports.buscarCliente = async (req, res) => {
    try{
        const { idCliente } = req.params 
        console.log(idCliente)
        if(!idCliente){
            return  res.status(400).send('Faltan datos')
        }
        const cliente = await Cliente.findById(idCliente)
         
        return res.status(200).json({
            status:"exito",
            mensaje:"Cliente encontrado",
            cliente
        })
    
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en buscar cliente" 
        })
    }

}
exports.actualizarCliente = async (req, res) => {
    try{
        const { idCliente } = req.params
        const clienteActualizado = req.body
        console.log("id del cliente: ",idCliente)
        console.log("datos actualizados recibidos: ",clienteActualizado)
        const cliente = await Cliente.findByIdAndUpdate(idCliente, clienteActualizado,{ new: true })

        if(!cliente){
            return res.status(404).send({
                status:"error",
                message:"No se ha actualizado el cliente"
             })
        } 
        return res.status(200).json({
            status:"exito",
            mensaje:"Cliente actualizado",
            cliente
        })  
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en actualizar cliente" 
        })
    }

}

exports.eliminarCliente = async (req, res) => {
    try{
        const { idEliminar }= req.params 
        const clienteEliminado = await Cliente.findByIdAndDelete(idEliminar);
        if(!clienteEliminado){
            return res.status(404).send({
                status:"error",
                message:"No se ha encontrado el cliente"
             })
        }     
        return res.status(200).json({
            status:"exito",
            mensaje:"Cliente Eliminado",
            cliente:clienteEliminado
        })
    }catch(error){
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en eliminar cliente" 
        })
    }

}