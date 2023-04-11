const db = require('../infra/database')
const _ = require('lodash')

exports.getSegmentos = function () {
    console.log("entrou no segmento")
    return db.query('select * from segmento order by nome');
}
exports.getCategorias = function () {
    console.log("entrou no categorias")
    return db.query('select * from categoria order by nome');
}
exports.getSubCategorias = function () {
    console.log("entrou no subcategoria")
    return db.query('select * from subcategoria order by pk_id');
}
exports.getSubcategoriaByFkId = function (query, fks) {
    console.log("entrou no segmento")
    return db.query(`select distinct nome from subcategoria where fk_subcategoria_categoria in (${query}) order by nome`,fks )
}
exports.getSubcategoriaByFkIdCategoria = function (id) {
    console.log("entrou no subcategorias")
    return db.query(`select * from subcategoria where fk_subcategoria_categoria = $1`,id )
}
exports.getCidades = function () {
    return db.query('select * from cidade')   
}