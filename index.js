const express = require('express');
const router = require('./routes/clienteRoute')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors())

app.use('/', router)

app.listen(5000, () => {
    console.log("listening to port 5000")
})