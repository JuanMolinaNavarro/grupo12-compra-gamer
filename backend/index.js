const express = require("express")
const {connection} = require("./config/database")
const routesProducts = require("./routes/products")
const routesAuth = require("./routes/auth")
const routesCategorias = require("./routes/categorias")
const routesPagos = require("./routes/pagos")
const routesPedidos = require("./routes/pedidos")
const cors = require('cors')


const app = express()


//Instanciando funciones de la biblioteca
app.use(cors())
app.use(express.json())
app.use("/",routesProducts)
app.use("/auth",routesAuth)
app.use("/",routesCategorias)
app.use("/",routesPagos)
app.use("/pedidos",routesPedidos)


app.get("/",(req,res)=>{
    res.send("API Grupo 12 - Compra Gamer")
})

//Puerto de escucha

const PORT = process.env.PORT || 8000

app.listen(PORT,(err)=>{
    if(err) throw err
    console.log("escuchando en el puerto "+PORT)
})

//Conexion a la DB

connection.connect((err)=>{
    if(err) throw err
    console.log("conectado a mi DB")
})