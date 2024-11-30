const express = require('express')
const router = express.Router()
const categoriaController = require('../controllers/categoriaController')

router.post('/crear', categoriaController.crearCategoria)  
router.get('/listar', categoriaController.listarCategoria)  
router.get('/buscar/:id', categoriaController.buscarCategoria)
router.put('/actualizar/:id', categoriaController.actualizarCategoria) 
router.delete('/eliminar/:idCategoria', categoriaController.eliminarCategoria)  

module.exports = router