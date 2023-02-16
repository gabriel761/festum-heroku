const pgp = require('pg-promise')(); 
// const db = pgp({
//     user: 'postgres',
//     password: 'thebest1761',
//     host: "localhost",
//     port: 5432,
//     database: 'festa-on'
// })

// const db = pgp({
//     user: 'vztihfmjvpncfr',
//     password: '60f8dfddd7b6132cdc96987443722e61cef7454870290d24cd42a195742e981b',
//     host: "ec2-44-194-92-192.compute-1.amazonaws.com",
//     port: 5432,
//     database: 'd85hrgsto4u8k2',
//     ssl: {
//         rejectUnauthorized: false
//     }
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