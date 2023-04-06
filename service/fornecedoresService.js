const fornecedoresData = require('../data/fornecedoresData')
const fornecedoresFunctions = require('../funtions/fornecedoresFunctions')


exports.getFornecedores = async function (idCliente, offset) {
    
    let  dataFornecedores = await fornecedoresData.getFornecedores(offset)
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
exports.getFornecedoresByNomeOrdem = async function (nome, ordem, idCliente) {
    let  dataFornecedores = null
    if(ordem == "distância"){
        dataFornecedores = await fornecedoresData.getFornecedoresByNome(nome)
        console.log("data fornecedores: ", dataFornecedores)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        dataFornecedores = fornecedoresFunctions.ordenarPorDistancia(dataFornecedores)
    }else{
        dataFornecedores = await fornecedoresData.getFornecedoresByNomeOrdem(nome, ordem)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        
    }
    return dataFornecedores
   
}
exports.getFornecedoresByNomeFiltro = async function (nome, filtro, tipoFiltro) {
    return fornecedoresData.getFornecedoresByNomeFiltro(nome, filtro, tipoFiltro)
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
    fornecedor.segmentos = fornecedoresFunctions.tratarCategorias(fornecedor.segmentos)
    fornecedor.categorias = fornecedoresFunctions.tratarCategorias(fornecedor.categorias)
    fornecedor.subcategorias = fornecedoresFunctions.tratarCategorias(fornecedor.subcategorias)
    
    return fornecedoresData.postFornecedores(fornecedor, id);
}
exports.testeFornecedor = function () {
    const result = fornecedoresFunctions.tratarCategorias([
        {pk_id:3,nome:"Artigos de Decoração"},
        {pk_id:2,nome:"Casamento"},
        {pk_id:1,nome:"Música"},
        {pk_id:4,nome:"Paulistano"},
        {pk_id:5,nome:"Prestígio"}
    ])
    console.log(result);
    return result
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