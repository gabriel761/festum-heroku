const categoriasData = require('../data/categoriasData')

exports.getCategorias = function () {
    return categoriasData.getCategorias()
}
exports.getSegmentos = function () {
    return categoriasData.getSegmentos()
}
exports.getSubcategorias = function () {
    return categoriasData.getSubcategorias()
}
exports.getSubcategoriaByFkId = function (id) {
    return categoriasData.getSubcategoriaByFkId(id);
}
exports.getCidades = function () {
    return categoriasData.getCidades()
}
