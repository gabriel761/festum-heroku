const db = require('../infra/database')

exports.postCartao = function (cartao) {
    try {
        return db.query(`insert into cartao (dados_cartao, numero, card_token, bandeira, fk_cartao_fornecedor) values($1,$2,$3,$4,$5)`, [cartao.dadosCartao, cartao.numero, cartao.token, cartao.bandeira, cartao.fkCartaoFornecedor])   
    } catch (error) {
        throw(error)
    }
}
exports.listarCartoesByIdFornecedor = function (idFornecedor) {
    try {
        return db.query(`select * from cartao where fk_cartao_fornecedor = $1`, [idFornecedor])
    } catch (error) {
        throw (error)
    }
}
exports.getCartaoByNumeroAndIdFornecedor = function (numero,idFornecedor) {
    try {
        return db.query(`select * from cartao where numero = $1 and fk_cartao_fornecedor = $2`, [numero,idFornecedor])
    } catch (error) {
        throw (error)
    }
}