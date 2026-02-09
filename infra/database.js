const pgp = require('pg-promise')(); 
// const db = pgp({
//     user: 'postgres',
//     password: 'thebest1761',
//     host: "localhost",
//     port: 5433,
//     database: 'festa-on'
// })


const db = pgp({
    user: 'postgres',
    password: 'CmllBZopgrnNrzVWRRWlpmQRhPuQZOIz',
    host: "caboose.proxy.rlwy.net",
    port: 25205,
    database: 'railway',
    ssl: {
        rejectUnauthorized: false
    }
})




module.exports = db