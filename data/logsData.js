const db = require('../infra/database')
exports.insertLog = function (data, tipoRequisicao) {
    try {
        return db.query(`insert into webhook_logs (JSONdata, tipo_requisicao) values($1, $2)`, [data, tipoRequisicao])
    } catch (error) {
        throw (error)
    }
}