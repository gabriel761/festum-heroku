const db = require('../infra/database')
exports.postCupom = function (cupom) {
    try {
        console.log("objeto cupom: ", cupom)
        return db.query('insert into cupom (porcentagem, codigo, fk_cupom_fornecedor, descricao, ativo) values($1,$2,$3,$4,$5)', [cupom.porcentagem, cupom.codigo,cupom.fk_cupom_fornecedor, cupom.descricao, cupom.ativarCupom ])
    } catch (error) {
        throw (error)
    }
}

exports.updateCupom = function (cupom) {
    try {
        console.log("atualizar cupom: ", cupom)
        return db.query('update cupom set porcentagem = $1, codigo = $2, descricao = $3, ativo = $4 where fk_cupom_fornecedor = $5', [cupom.porcentagem, cupom.codigo, cupom.descricao, cupom.ativarCupom, cupom.fk_cupom_fornecedor])
    } catch (error) {
        throw ("Erro no update cupom: " + error.message)
    }
}

exports.getCupom = function (idFornecedor) {
    try {
        return db.query('select * from cupom where fk_cupom_fornecedor = $1', [idFornecedor])
    }catch(error){
        throw ("Erro ao pegar cupom: "+error.message);
    }
}