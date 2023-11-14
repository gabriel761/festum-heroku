const anuncioData = require('../data/anuncioData')
const anuncioFestumData = require('../data/anuncioFestumData')
exports.postAnuncio = function (anucio) {
    return anuncioData.postAnuncio(anucio)
}
exports.updateAnuncio = function (anucio) {
    return anuncioData.updateAnuncio(anucio)
}
exports.getAnuncioTipo = async function (tipoAnuncio) {

    let anunciosResult = await anuncioData.getAnuncioTipo(tipoAnuncio)
    if(anunciosResult.length == 0){
      anunciosResult = await  anuncioFestumData.getAnuncioTipoFestum(tipoAnuncio)
    }
    return anunciosResult

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