 const db = require('../infra/database')
 exports.postAnuncio = function ( anuncio) {
    return db.query('insert into anuncio (titulo, tipo_anuncio, preco_anuncio, para_fornecedor, imagem, status, id_produto, id_fornecedor_link, fk_anuncio_fornecedor, data_inicio, data_final, duracao_plano ) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)',[anuncio.titulo, anuncio.tipoAnuncio, anuncio.preco_anuncio, false, anuncio.imagem, anuncio.status, anuncio.idProduto, anuncio.idFornecedor, anuncio.idFornecedor, anuncio.dataInicio, anuncio.dataFinal, anuncio.duracaoPlano])
}
exports.updateAnuncio = function ( anuncio) {
    console.log("atualizar anuncio: ", anuncio)
    return db.query('update anuncio set titulo = $1, imagem = $2 where pk_id = $3',[anuncio.titulo, anuncio.imagem, anuncio.idAnuncio])
}
exports.getAnuncioTipo = function ( tipoAnuncio) {
    console.log(tipoAnuncio)
    return db.query('select * from anuncio where tipo_anuncio = $1',tipoAnuncio)
}
exports.getAnuncioByIdFornecedor = function (id) {
    
    return db.query('select * from anuncio where fk_anuncio_fornecedor = $1',id)
}
exports.getAnuncioFromId = function ( pk_id) {
    console.log(pk_id)
    return db.query('select * from anuncio where pk_id = $1',pk_id)
}
exports.deleteAnuncioById = function ( pk_id) {
    console.log(pk_id)
    return db.query('delete from anuncio where pk_id = $1',pk_id)
}