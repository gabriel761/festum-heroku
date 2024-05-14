const db = require('../infra/database')

exports.postAssinatura = function (assinatura) {
    try {
        return db.query(`insert into assinatura (dados_assinatura, data_primeira_cobranca, id, card_token, data_contagem_bloqueio, fk_assinatura_fornecedor, profile_id, tipo_assinatura) values($1,$2,$3,$4,$5,$6,$7,$8)`, [assinatura.dadosAssinatura, assinatura.dataPrimeraCobranca, assinatura.idUnico, assinatura.cardToken, null, assinatura.fkAssinaturaFornecedor, assinatura.profile_id, assinatura.tipoAssinatura])
    } catch (error) {
        throw (error)
    }
}

exports.updateAssinatura = function (assinatura) {
    console.log("update assinatura: ",assinatura)
    try {
        return db.query(`update assinatura set dados_assinatura = $1, card_token = $2, data_contagem_bloqueio = $3, cancelado = $4  where fk_assinatura_fornecedor = $5 `, [assinatura.dadosAssinatura, assinatura.cardToken, assinatura.dataBloqueio, assinatura.cancelado, assinatura.idFornecedor])
    } catch (error) {
        throw (error)
    }
}

exports.getAssinaturaByIdFornecedor = function (idFornecedor) {
    try {
        console.log("fk fornecedor dentro do data assinatura: ", idFornecedor)
        return db.query(`select * from assinatura where fk_assinatura_fornecedor = $1`, [idFornecedor])
    } catch (error) {
        throw (error)
    }
}
exports.deleteAssinaturaByIdUnico = function (idUnico) {
    try {
        return db.query(`delete from assinatura where id = $1`, [idUnico])
    } catch (error) {
        throw (error)
    }
}
exports.cancelarAssinaturaByIdUnico = function (idUnico) {
    try {
        return db.query(`update assinatura set cancelado = true where id = $1`, [idUnico])
    } catch (error) {
        throw (error)
    }
}

exports.reativarAssinaturaByIdUnico = function (idUnico) {
    try {
        return db.query(`update assinatura set cancelado = true where id = $1`, [idUnico])
    } catch (error) {
        throw (error)
    }
}