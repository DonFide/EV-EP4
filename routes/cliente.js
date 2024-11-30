const express = require('express')
const router = express.Router()
const clienteController = require('../controllers/clienteController')

router.post('/crear', clienteController.registrarCliente)  
router.get('/listar', clienteController.listarCliente)  
router.get('/:idCliente', clienteController.buscarCliente)
router.put('/actualizar/:idCliente', clienteController.actualizarCliente)  
router.delete('/eliminar/:idEliminar', clienteController.eliminarCliente)  

module.exports = router
