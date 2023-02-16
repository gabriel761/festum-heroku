const anuncioData = require('../data/anuncioData')

exports.postAnuncio = function (anucio) {
    return anuncioData.postAnuncio(anucio)
}
exports.getAnuncioTipo = function (tipoAnuncio) {
    return anuncioData.getAnuncioTipo(tipoAnuncio)
}
exports.getAnuncioFromId = function (pk_id) {
    return anuncioData.getAnuncioFromId(pk_id)
}