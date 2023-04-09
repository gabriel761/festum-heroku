const categoriasData = require('../data/categoriasData')
const categoriasFunctions = require("../funtions/categoriasFunctions")
exports.getCategorias = function () {
    return categoriasData.getCategorias()
}
exports.getSegmentos = function () {
    return categoriasData.getSegmentos()
}
exports.getSubcategorias = function () {
    return categoriasData.getSubCategorias()
}
exports.getSubcategoriaByFkId = function (ids) {
    const query = categoriasFunctions.createQueryString(ids)
    const fks = categoriasFunctions.fkOnlyArray(ids)
    console.log("nomes: ",fks)
    return categoriasData.getSubcategoriaByFkId(query, fks);
}
exports.getSubcategoriaByFkIdCategoria = function (id) {

    
    return categoriasData.getSubcategoriaByFkIdCategoria(id);
}
exports.getCidades = function () {
    return categoriasData.getCidades()
}
