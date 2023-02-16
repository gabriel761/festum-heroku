const fornecedoresData = require('../data/fornecedoresData')
const fornecedoresFunctions = require('../funtions/fornecedoresFunctions')


exports.getFornecedores = async function (idCliente) {
    
    let  dataFornecedores = await fornecedoresData.getFornecedores()
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    
    return dataFornecedores
}
exports.getFornecedoresSemDistancia = async function () {
    let  dataFornecedores = await fornecedoresData.getFornecedoresSemDistancia()
    return dataFornecedores
}
exports.getIdFornecedorByIdFirebase = function (idFirebase) {
    return fornecedoresData.getIdFornecedorByIdFirebase(idFirebase)
}
exports.getFornecedorByIdFirebase = function (idFirebase) {
    return fornecedoresData.getFornecedorByIdFirebase(idFirebase)
}
exports.checkIfCnpjExists = async function (cnpj) {
    let  dataFornecedores = await fornecedoresData.getIdByCnpjExport(cnpj)
    return dataFornecedores
}

exports.getFornecedoresBySegmento = function (segmento) {
    return fornecedoresData.getFornecedoresBySegmento(segmento)
}
exports.getFornecedoresByCategoria = function (categoria) {
    return fornecedoresData.getFornecedoresByCategoria(categoria)
}
exports.getFornecedoresByOrdem = function ( ordem, segmento) {
    return fornecedoresData.getFornecedoresByOrdem( ordem, segmento)
}
exports.getFornecedoresByNome = function (nome, segmento) {
    return fornecedoresData.getFornecedoresByNome(nome, segmento);
}
exports.getFornecedoresByNomeOrdem = function (nome, ordem) {
    return fornecedoresData.getFornecedoresByNomeOrdem(nome, ordem);
}
exports.getFornecedoresBySegmentoAndCategoria = function (segmento, categoria) {
    return fornecedoresData.getFornecedoresBySegmentoAndCategoria(segmento, categoria)
}
exports.getFornecedoresByNomeAndCategoria = function (nome, categoria) {
    return fornecedoresData.getFornecedoresByNomeAndCategoria(nome, categoria)
}
exports.getFornecedoresByNomeCategoriaAndSegmento = function (nome, categoria) {
    return fornecedoresData.getFornecedoresByNomeCategoriaAndSegmento(nome, categoria)
}
exports.getFornecedoresBySegmentoNomeAndOrdem = function (nome, ordem) {
    return fornecedoresData.getFornecedoresBySegmentoNomeAndOrdem(nome, ordem)
}
exports.getFornecedoresBySegmentoAndOrdem = function ( ordem, segmento) {
    return fornecedoresData.getFornecedoresBySegmentoAndOrdem( ordem, segmento)
}
exports.getFornecedoresBySegmentoAndNome = function (nome, segmento) {
    return fornecedoresData.getFornecedoresBySegmentoAndNome(nome, segmento);
}
exports.getFornecedoresVip = function () {
    return fornecedoresData.getFornecedoresVip()
}
exports.postFornecedores = function (fornecedor, id) {
    fornecedor.preco = fornecedoresFunctions.tratarPreco(fornecedor.preco)
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

exports.deleteEverythingFornecedor = function (id,idPessoa){
    return fornecedoresData.deleteEverythingFornecedor(id,idPessoa)
}