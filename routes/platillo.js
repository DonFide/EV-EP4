const express = require('express')
const router = express.Router()
const platilloController = require('../controllers/platilloController')

router.post('/crear', platilloController.crearPlatillo)  
router.get('/listar', platilloController.listarPlatillo)
router.get('/buscar/:idPlatillo', platilloController.buscarPlatillo)   
router.put('/actualizar/:idPlatillo', platilloController.actualizarPlatillo)  
router.delete('/eliminar/:idPlatillo', platilloController.eliminarPlatillo)  
module.exports = router
