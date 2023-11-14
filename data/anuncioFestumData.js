const db = require('../infra/database')
exports.getAnuncioTipoFestum = function (tipoAnuncio) {
    try {
        console.log(tipoAnuncio)
        return db.query('select * from anuncio_festum where tipo_anuncio = $1 and data_inicio <= now() and data_final >= now()', tipoAnuncio)
    } catch (error) {
        throw (error)
    }
}