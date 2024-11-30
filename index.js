const express = require('express')
const conectarBaseDatos = require('./config/db')
const config = require('./config/global')
const cors = require('cors')
const platilloRouter=require("./routes/platillo")
const clienteRouter=require("./routes/cliente")
const categoriaRouter=require("./routes/categoria")
const ordenRouter=require("./routes/orden")
const meseroRouter=require("./routes/mesero")



const app = express()

conectarBaseDatos()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:false}))

 

app.use(express.static('public'))
app.use('/api/platillo', platilloRouter) 
app.use('/api/cliente', clienteRouter) 
app.use('/api/categoria', categoriaRouter) 
app.use('/api/orden', ordenRouter) 
app.use('/api/mesero', meseroRouter) 





app.listen(config.port, () => {
    console.log('El servidor corriendo por el puerto http://localhost:3030')
})