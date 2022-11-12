const pgp = require('pg-promise')(); 
const db = pgp({
    user: 'vztihfmjvpncfr',
    password: '60f8dfddd7b6132cdc96987443722e61cef7454870290d24cd42a195742e981b',
    host: "ec2-44-194-92-192.compute-1.amazonaws.com",
    port: 5432,
    database: 'd85hrgsto4u8k2',
    connectionString: "postgres://vztihfmjvpncfr:60f8dfddd7b6132cdc96987443722e61cef7454870290d24cd42a195742e981b@ec2-44-194-92-192.compute-1.amazonaws.com:5432/d85hrgsto4u8k2",
    ssl: {
        rejectUnauthorized: false
    }
})


module.exports = db