const fornecedoresData = require('../data/fornecedoresData')

exports.getFornecedores = function () {
    console.log("entrou em service")
    return fornecedoresData.getFornecedores()
}
exports.getFornecedoresBySegmento = function (segmento) {
    return fornecedoresData.getFornecedoresBySegmento(segmento)
}
exports.getFornecedoresBySegmentoAndCategoria = function (segmento, categoria) {
    return fornecedoresData.getFornecedoresBySegmentoAndCategoria(segmento, categoria)
}
exports.getFornecedoresVip = function () {
    return fornecedoresData.getFornecedoresVip()
}
exports.postFornecedores = function (fornecedor, id) {
    return fornecedoresData.postFornecedores(fornecedor, id);
}

exports.loginFornecedor = function (login) {
    return fornecedoresData.loginFornecedor(login)
}

exports.pesquisarFornecedoresVip = function (pesquisa){
    return fornecedoresData.pesquisarFornecedoresVip(pesquisa)
}
exports.getFornecedoresVip = function (){
    return fornecedoresData.getFornecedoresVip()
}

exports.getFornecedorById = function (id){
    return fornecedoresData.getFornecedorById(id)
}