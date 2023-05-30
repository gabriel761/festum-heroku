const anuncioData = require('../data/anuncioData')

exports.postAnuncio = function (anucio) {
    return anuncioData.postAnuncio(anucio)
}
exports.updateAnuncio = function (anucio) {
    return anuncioData.updateAnuncio(anucio)
}
exports.getAnuncioTipo = function (tipoAnuncio) {
    return anuncioData.getAnuncioTipo(tipoAnuncio)
}
exports.getAnuncioByIdFornecedor = function (id) {
    return anuncioData.getAnuncioByIdFornecedor(id)
}
exports.getAnuncioFromId = function (pk_id) {
    return anuncioData.getAnuncioFromId(pk_id)
}
exports.deleteAnuncioById = function (pk_id) {
    return anuncioData.deleteAnuncioById(pk_id)
}