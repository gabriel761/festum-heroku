const db = require('../infra/database')
exports.insertLog = function (data) {
    try {
        return db.query(`insert into webhook_logs (JSONdata) values($1)`, [data])
    } catch (error) {
        throw (error)
    }
}