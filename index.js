const express = require('express')
//usar variables .env
require('dotenv').config()
//inicializar express
const app = express()
//llamar mongoose y rutas
const mongoose = require('mongoose')
const routes = require('./src/routes/routesindex')
const cors = require('cors')

PORT = process.env.PORT
MONGO_URI = process.env.MONGO_URI

const corsOptions = {
    origin: '*', // Reemplaza esto con el dominio permitido
    methods: 'GET,PUT,POST,DELETE',
    credentials: true, // Permite el envío de cookies o credenciales
    optionsSuccessStatus: 204, // Configura el código de respuesta para las solicitudes OPTIONS
};

app.use(cors(corsOptions))
//middleware; parsear info que llega en formato json
app.use(express.json())


app.use('/v1', routes)

mongoose.connect(MONGO_URI).then(() => console.log('connected'))

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})