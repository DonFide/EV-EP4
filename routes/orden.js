const express = require('express')
const router = express.Router()
const ordenController = require('../controllers/ordenController')

router.post('/crear', ordenController.crearOrden)
router.get('/listar', ordenController.listarOrden)   
router.get('/buscar/:idOrden', ordenController.buscarOrden)  
router.get('/buscarMesa/:idmesa', ordenController.buscarMesa)  
router.put('/actualizar/:idOrden', ordenController.actualizarOrden)  
router.delete('/eliminar/:idOrden', ordenController.eliminarOrden)  

module.exports = router
