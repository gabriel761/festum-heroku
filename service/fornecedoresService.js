const fornecedoresData = require('../data/fornecedoresData')
const pessoaService = require('../service/pessoaService')
const fornecedoresFunctions = require('../funtions/fornecedoresFunctions')


exports.getFornecedores = async function (idCliente) {

    try {
        let dataFornecedores = await fornecedoresData.getFornecedores()
        console.log("data fornecedores antes de calcular distancia: ", dataFornecedores)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (e) {
        console.log(e)
    }

}

exports.getFornecedoresOffset = async function (idCliente, offset) {

    let dataFornecedores = await fornecedoresData.getFornecedoresOffset(offset)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)

    return dataFornecedores
}
exports.getFornecedoresSemDistancia = async function () {
    let dataFornecedores = await fornecedoresData.getFornecedoresSemDistancia()
    return dataFornecedores
}
exports.fornecedoresSemDistanciaPreCadastro = async function () {
    let dataFornecedores = await fornecedoresData.fornecedoresSemDistanciaPreCadastro()
    return dataFornecedores
}
exports.fornecedoresSemDistanciaPreCadastroComStatus = async function (statusConta) {
    let dataFornecedores = await fornecedoresData.fornecedoresSemDistanciaPreCadastroComStatus(statusConta)
    return dataFornecedores
}
exports.fornecedoresSemDistanciaPreCadastroComStatusEPlano = async function (statusConta, plano) {
    let dataFornecedores = await fornecedoresData.fornecedoresSemDistanciaPreCadastroComStatusEPlano(statusConta, plano)
    return dataFornecedores
}
exports.fornecedoresSemDistanciaPreCadastroComPlano = async function ( plano) {
    let dataFornecedores = await fornecedoresData.fornecedoresSemDistanciaPreCadastroComPlano(plano)
    return dataFornecedores
}
exports.getIdFornecedorByIdFirebase = function (idFirebase) {
    return fornecedoresData.getIdFornecedorByIdFirebase(idFirebase)
}
exports.getFornecedorByIdFirebase = function (idFirebase) {
    return fornecedoresData.getFornecedorByIdFirebase(idFirebase)
}
exports.getFornecedorByEmail = function (email) {
    return fornecedoresData.getFornecedorByEmail(email)
}
exports.getFornecedorAndPessoaByIdFirebase = function (idFirebase) {
    return fornecedoresData.getFornecedorAndPessoaByIdFirebase(idFirebase)
}
exports.checkIfCnpjExists = async function (cnpj) {
    let dataFornecedores = await fornecedoresData.getIdByCnpjExport(cnpj)
    return dataFornecedores
}

exports.getFornecedoresBySegmento = async function (segmento, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySegmento(segmento)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByCategoria = async function (categoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByCategoria(categoria)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByCategoriaOffset = async function (categoria, idCliente, offset) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByCategoriaOffset(categoria, offset)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByCategoriaOrdemOffset = async function (categoria, ordem, idCliente, offset) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByCategoriaOrdemOffset(categoria, ordem, offset)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresBySubCategoria = async function (subCategoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoria(subCategoria)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByOrdem = async function (ordem, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByOrdem(ordem)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByOrdemOffset = async function (ordem, offset, idCliente) {
    let dataFornecedores
    if (ordem == "distância") {
        dataFornecedores = await fornecedoresData.getFornecedoresOffset(offset)
        console.log("data fornecedores: ", dataFornecedores)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        dataFornecedores = fornecedoresFunctions.ordenarPorDistancia(dataFornecedores)
    } else {
        dataFornecedores = await fornecedoresData.getFornecedoresByOrdemOffset(ordem, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)

    }
    return dataFornecedores
}

exports.getFornecedoresByNome = async function (nome, segmento, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByNome(nome, segmento);

    return dataFornecedores
}
exports.getFornecedoresByNomeOrdem = async function (nome, ordem, idCliente) {
    let dataFornecedores = null
    if (ordem == "distância") {
        dataFornecedores = await fornecedoresData.getFornecedoresByNome(nome)
        console.log("data fornecedores: ", dataFornecedores)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        dataFornecedores = fornecedoresFunctions.ordenarPorDistancia(dataFornecedores)
    } else {
        dataFornecedores = await fornecedoresData.getFornecedoresByNomeOrdem(nome, ordem)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)

    }
    return dataFornecedores

}
exports.getFornecedoresByNomeFiltro = async function (nome, filtro, tipoFiltro, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByNomeFiltro(nome, filtro, tipoFiltro)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByFiltroOffset = async function (filtro, tipoFiltro, offset, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByFiltroOffset(filtro, tipoFiltro, offset)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByFiltroCategoriaOffset = async function (filtro, tipoFiltro, categoria, offset, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByFiltroCategoriaOffset(filtro, tipoFiltro, categoria, offset)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresBySegmentoAndCategoria = async function (segmento, categoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndCategoria(segmento, categoria)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresBySegmentoAndCategoriaAndSubCategoria = async function (segmento, categoria, subcategoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndCategoriaAndSubCategoria(segmento, categoria, subcategoria)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByNomeAndCategoria = async function (nome, categoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByNomeAndCategoria(nome, categoria)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresByNomeCategoriaAndSegmento = async function (nome, categoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresByNomeCategoriaAndSegmento(nome, categoria)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresBySegmentoNomeAndOrdem = async function (nome, ordem, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoNomeAndOrdem(nome, ordem)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresBySegmentoAndOrdem = async function (ordem, segmento, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndOrdem(ordem, segmento)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresBySegmentoAndNome = async function (nome, segmento, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndNome(nome, segmento);
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedoresVip = function () {
    return fornecedoresData.getFornecedoresVip()
}
exports.postFornecedores = async function (fornecedor, id) {
    try {
        if (fornecedor.preco)
            fornecedor.preco = await fornecedoresFunctions.tratarPreco(fornecedor.preco)
        if (fornecedor.segmentos)
            fornecedor.segmentos = await fornecedoresFunctions.tratarCategorias(fornecedor.segmentos)
        if (fornecedor.categorias)
            fornecedor.categorias = await fornecedoresFunctions.tratarCategorias(fornecedor.categorias)
        if (fornecedor.subcategorias) {
            fornecedor.subcategorias = await fornecedoresFunctions.tratarCategorias(fornecedor.subcategorias)
        }
        console.log("segmento antes de cadastrar: ", fornecedor.segmentos)
        console.log("categorias antes de cadastrar: ", fornecedor.categorias)
        console.log("subcategorias antes de cadastrar: ", fornecedor.subcategorias)
        return fornecedoresData.postFornecedores(fornecedor, id);
    } catch (error) {
        throw error
    }

}
exports.updateFornecedores = function (fornecedor) {
    try {
        fornecedor.preco = fornecedoresFunctions.tratarPreco(fornecedor.preco)
        fornecedor.segmentos = fornecedoresFunctions.tratarCategorias(fornecedor.segmentos)
        fornecedor.categorias = fornecedoresFunctions.tratarCategorias(fornecedor.categorias)
        fornecedor.subcategorias = fornecedoresFunctions.tratarCategorias(fornecedor.subcategorias)
        return fornecedoresData.updateFornecedores(fornecedor);
    } catch (e) {
        console.log(e)
    }
}
exports.updateFornecedoresNebulosa = async function (fornecedor) {
    try {
        fornecedor.preco = fornecedoresFunctions.tratarPreco(fornecedor.preco)
        fornecedor.segmentos = fornecedoresFunctions.tratarCategorias(fornecedor.segmentos)
        fornecedor.categorias = fornecedoresFunctions.tratarCategorias(fornecedor.categorias)
        fornecedor.subcategorias = fornecedoresFunctions.tratarCategorias(fornecedor.subcategorias)
        await pessoaService.updateEmailNebulosa(fornecedor.email, fornecedor.idPessoa)
        return fornecedoresData.updateFornecedores(fornecedor);
    } catch (e) {
        console.log(e)
    }
}
exports.updateFornecedorCompletarCadastro = function (cadastro) {
    return fornecedoresData.updateFornecedorCompletarCadastro(cadastro)
}
exports.updateStatusPagamentoFornecedor = function (statusPagamento, fk_id) {
    return fornecedoresData.updateStatusPagamentoFornecedor(statusPagamento, fk_id)
}
exports.testeFornecedor = function () {
    const result = fornecedoresFunctions.tratarCategorias([
        { pk_id: 3, nome: "Artigos de Decoração" },
        { pk_id: 2, nome: "Casamento" },
        { pk_id: 1, nome: "Música" },
        { pk_id: 4, nome: "Paulistano" },
        { pk_id: 5, nome: "Prestígio" }
    ])
    console.log(result)
    return result
}

exports.loginFornecedor = function (login) {
    return fornecedoresData.loginFornecedor(login)
}

exports.pesquisarFornecedoresVip = function (pesquisa) {
    return fornecedoresData.pesquisarFornecedoresVip(pesquisa)
}
exports.getFornecedoresVip = function () {
    return fornecedoresData.getFornecedoresVip()
}

exports.getFornecedorById = function (id) {
    return fornecedoresData.getFornecedorById(id)
}
exports.getFornecedorByIdPessoa = async function (id, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedorByIdPessoa(id)
    dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
    return dataFornecedores
}
exports.getFornecedorByIdPessoaSemDistancia = async function (id) {
    let dataFornecedores = await fornecedoresData.getFornecedorByIdPessoa(id)
    return dataFornecedores
}

exports.deleteEverythingFornecedor = function (id, idPessoa) {
    return fornecedoresData.deleteEverythingFornecedor(id, idPessoa)
}