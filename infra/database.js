const pgp = require('pg-promise')(); 
// const db = pgp({
//     user: 'postgres',
//     password: 'thebest1761',
//     host: "localhost",
//     port: 5432,
//     database: 'festa-on'
// })


const db = pgp({
    user: 'postgres',
    password: 'w4IwZ82zpgX8jqWPS02f',
    host: "containers-us-west-61.railway.app",
    port: 6408,
    database: 'railway',
    ssl: {
        rejectUnauthorized: false
    }
})




module.exports = db