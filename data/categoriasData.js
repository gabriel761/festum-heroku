const db = require('../infra/database')
const _ = require('lodash')

exports.getSegmentos = function () {
    console.log("entrou no segmento")
    return db.query('select * from segmento');
}
exports.getCategorias = function () {
    console.log("entrou no categorias")
    return db.query('select * from categoria');
}
exports.getSubCategorias = function () {
    console.log("entrou no subcategoria")
    return db.query('select * from subcategoria');
}
exports.getSubcategoriaByFkId = function (id) {
    console.log("entrou no segmento")
    return db.query('select * from subcategoria where fk_subcategoria_categoria = $1',id )
}
exports.getCidades = function () {
    return db.query('select * from cidade')   
}