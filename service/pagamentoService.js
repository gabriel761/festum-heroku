const pagamentoData = require('../data/pagamentoData')

exports.postCartao = function(assinatura){
    try {
        return pagamentoData.postCartao(assinatura)
    } catch (error) {
        throw(error)
    }
    
}
exports.listarCartoesByIdFornecedor = function (idFornecedor) {
    try {
        return  pagamentoData.listarCartoesByIdFornecedor(idFornecedor);
    } catch (error) {
        throw (error)
    }

}
exports.getCartaoByNumeroAndIdFornecedor = function (numero,idFornecedor) {
    try {
        return pagamentoData.getCartaoByNumeroAndIdFornecedor(numero,idFornecedor);
    } catch (error) {
        throw (error)
    }

}