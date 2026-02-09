const db = require('../infra/database')
exports.postAnuncio = async function (anuncio) {
    try {
        await db.query('insert into anuncio (titulo, tipo_anuncio, preco_anuncio, para_fornecedor, imagem, status, id_produto, id_fornecedor_link, fk_anuncio_fornecedor, data_inicio, data_final, duracao_plano ) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)', [anuncio.titulo, anuncio.tipoAnuncio, anuncio.preco_anuncio, false, anuncio.imagem, anuncio.status, anuncio.idProduto, anuncio.idFornecedor, anuncio.idFornecedor, anuncio.dataInicio, anuncio.dataFinal, anuncio.duracaoPlano])
    } catch (error) {
        console.log("post anuncio database",error.message)
    }
}
exports.updateAnuncio = function (anuncio) {
    try {
        console.log("atualizar anuncio: ", anuncio)
        return db.query('update anuncio set titulo = $1, imagem = $2 where pk_id = $3', [anuncio.titulo, anuncio.imagem, anuncio.idAnuncio])
    } catch (error) {
        throw (error)
    }
}
exports.getAnuncioTipo = function (tipoAnuncio) {
    try {
        console.log(tipoAnuncio)
        return db.query('select * from anuncio where tipo_anuncio = $1 and data_inicio <= now() and data_final >= now()', tipoAnuncio)
    } catch (error) {
        throw (error)
    }
}
exports.getAnuncioByIdFornecedor = function (id) {
    try {
        return db.query('select * from anuncio where fk_anuncio_fornecedor = $1', id)
    } catch (error) {
        throw (error)
    }
}
exports.getAnuncioFromId = function (pk_id) {
    try {
        console.log(pk_id)
        return db.query('select * from anuncio where pk_id = $1', pk_id)
    } catch (error) {
        throw (error)
    }
}
exports.deleteAnuncioById = function (pk_id) {
    try {
        console.log(pk_id)
        return db.query('delete from anuncio where pk_id = $1', pk_id)
    } catch (error) {
        throw (error)
    }
}