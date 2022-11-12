const pgp = require('pg-promise')(); 
const db = pgp({
    user: 'postgres',
    password: 'thebest1761',
    host: 'localhost',
    port: 5432,
    database: 'festa-on'
})

module.exports = db