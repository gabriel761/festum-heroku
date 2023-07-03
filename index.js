const express = require('express');
const router = require('./routes/clienteRoute')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")


 const port = process.env.PORT || 5000
 
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use(cors({
    origin: "http://10.0.0.103:3000",
    methods: ["GET", "POST", "PUT", "DELETE"]
}))

app.use('/', router)

app.listen(port, () => {
    console.log("listening to port "+ port)
})