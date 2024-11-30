const express = require('express')
const router = express.Router()
const meseroController = require('../controllers/meseroController')

router.post('/crear', meseroController.crearMesero)  
router.get('/listar', meseroController.listarMesero)
router.get('/buscar/:idMesero', meseroController.buscarMesero)
router.put('/actualizar/:idMesero', meseroController.actualizarMesero)  
router.delete('/eliminar/:idMesero', meseroController.eliminarMesero)  

module.exports = router