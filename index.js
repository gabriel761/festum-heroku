const express = require('express');
const router = require('./routes/clienteRoute')
const app = express()
const cors = require("cors")
const bodyParser = require("body-parser")

app.use (function (req, res, next) {
    console.log ("inside middleware");
    next();
  });
 const port = process.env.PORT || 5000
 
 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "festum-site.vercel.app"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });
app.use(express.json())
app.use(express.urlencoded({extended:false}))
app.use (function (req, res, next) {
    console.log ("inside middleware");
    next();
  });
// app.use(cors({
//     allowedHeaders: "*",
//     allowedMethods: "*",
//     origin: "*"
// }))

app.use('/', router)

app.listen(port, () => {
    console.log("listening to port:: "+ port)
    console.log("deploy teste ")
})