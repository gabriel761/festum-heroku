const pgp = require('pg-promise')(); 
const db = pgp({
    user: 'postgres',
    password: 'thebest1761',
    host: "localhost",
    port: 5433,
    database: 'festa-on'
})


// const db = pgp({
//     user: 'postgres',
//     password: 'e63133c5fG5cc36bE1FgCDFcbdFaE6b1',
//     host: "monorail.proxy.rlwy.net",
//     port: 44630,
//     database: 'railway',
//     ssl: {
//         rejectUnauthorized: false
//     }
// })




module.exports = db