const db = require('../infra/database')
const _ = require('lodash')

exports.getSegmentos = function () {
    try {
        console.log("entrou no segmento")
        return db.query('select * from segmento order by nome');
    } catch (error) {
        throw (error)
    }
}
exports.getCategorias = function () {
    try {
        console.log("entrou no categorias")
        return db.query('select * from categoria order by nome');
    } catch (error) {
        throw (error)
    }
}
exports.getSubCategorias = function () {
    try {
        console.log("entrou no subcategoria")
        return db.query('select nome, imagem from subcategoria order by pk_id');
    } catch (error) {
        throw (error)
    }
}
exports.getSubcategoriaByFkId = function (query, fks) {
    try {
        console.log("entrou no segmento")
        return db.query(`select distinct nome from subcategoria where fk_subcategoria_categoria in (${query}) order by nome`, fks)
    } catch (error) {
        throw (error)
    }
}
exports.getSubcategoriaByFkIdCategoria = function (id) {
    try {
        console.log("entrou no subcategorias")
        return db.query(`select * from subcategoria where fk_subcategoria_categoria = $1`, id)
    } catch (error) {
        throw (error)
    }
}
exports.getCidades = function () {
    try {
        return db.query('select * from cidade')
    } catch (error) {
        throw (error)
    }
}