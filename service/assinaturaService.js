const assinaturaData = require('../data/assinaturaData')

exports.postAssinatura = function (cartao) {
    try {
        return assinaturaData.postAssinatura(cartao)
    } catch (error) {
        throw (error)
    }

}

exports.updateAssinatura = function (assinatura) {
    try {
        return assinaturaData.updateAssinatura(assinatura)
    } catch (error) {
        throw (error)
    }

}

exports.getAssinaturaByIdFornecedor = function (idFornecedor) {
    try {
        return assinaturaData.getAssinaturaByIdFornecedor(idFornecedor)
    } catch (error) {
        throw (error)
    }

}
exports.deleteAssinaturaByIdUnico = function (idUnico) {
    try {
        return assinaturaData.deleteAssinaturaByIdUnico(idUnico)
    } catch (error) {
        throw (error)
    }

}