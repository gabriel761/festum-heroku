const cupomData = require('../data/cupomData')

exports.getCupom = function (idFornecedor) {
    return cupomData.getCupom(idFornecedor)
}