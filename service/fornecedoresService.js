const fornecedoresData = require('../data/fornecedoresData')
const pessoaService = require('../service/pessoaService')
const fornecedoresFunctions = require('../funtions/fornecedoresFunctions')
const assinaturaData = require("../data/assinaturaData")


exports.getFornecedores = async function (idCliente) {

    try {
        let dataFornecedores = await fornecedoresData.getFornecedores()
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (e) {
        console.log(e)
    }

}
exports.getFornecedoresDestaque = async function (idCliente) {

    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresDestaque()
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
exports.fornecedoresSemDistanciaPreCadastroComPlano = async function (plano) {
    let dataFornecedores = await fornecedoresData.fornecedoresSemDistanciaPreCadastroComPlano(plano)
    return dataFornecedores
}
exports.fornecedoresSemDistanciaPreCadastroComPlanoAsc = async function (plano) {
    let dataFornecedores = await fornecedoresData.fornecedoresSemDistanciaPreCadastroComPlanoAsc(plano)
    return dataFornecedores
}
exports.getIdFornecedorByIdFirebase = function (idFirebase) {
    return fornecedoresData.getIdFornecedorByIdFirebase(idFirebase)
}
exports.getFornecedorByIdFirebase = async function (idFirebase) {
    let fornecedor = await fornecedoresData.getFornecedorByIdFirebase(idFirebase)
    let assinatura = await assinaturaData.getAssinaturaByIdFornecedor(fornecedor[0].pk_id)
    fornecedor = fornecedor[0]
    if (assinatura.length > 0) {
        assinatura = assinatura[0]
        delete assinatura.pk_id

        return { ...fornecedor, ...assinatura }
    } else {
        return fornecedor
    }


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
exports.getFornecedoresDestaqueByCategoria = async function (categoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresDestaqueByCategoria(categoria)
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
exports.getFornecedoresByCategoriaFiltroOffset = async function (categoria, tipoFiltro, filtro, idCliente, offset) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresByCategoriaFiltroOffset(categoria, tipoFiltro, filtro, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoria = async function (subCategoria, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoria(subCategoria)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaOffset = async function (subCategoria, idCliente, offset) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaOffset(subCategoria, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }
},
    exports.getFornecedoresBySubCategoriaOrdem = async function (subCategoria, ordem, idCliente) {
        try {
            let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaOrdem(subCategoria, ordem)
            dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
            return dataFornecedores
        } catch (error) {
            throw (error)
        }

    }
exports.getFornecedoresBySubCategoriaOrdemOffset = async function (subCategoria, ordem, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaOrdemOffset(subCategoria, ordem, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaFiltro = async function (subCategoria, tipoFiltro, filtro, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaFiltro(subCategoria, tipoFiltro, filtro)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaFiltroOffset = async function (subCategoria, tipoFiltro, filtro, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaFiltroOffset(subCategoria, tipoFiltro, filtro, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmento = async function (subCategoria, segmento, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaAndSegmento(subCategoria, segmento)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoOffset = async function (subCategoria, segmento, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaAndSegmentoOffset(subCategoria, segmento, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoOrdem = async function (subCategoria, segmento, ordem, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaAndSegmentoOrdem(subCategoria, segmento, ordem)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoOrdemOffset = async function (subCategoria, segmento, ordem, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaAndSegmentoOrdemOffset(subCategoria, segmento, ordem, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoFiltro = async function (subCategoria, segmento, tipoFiltro, filtro, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaAndSegmentoFiltro(subCategoria, segmento, tipoFiltro, filtro)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoFiltroOffset = async function (subCategoria, segmento, tipoFiltro, filtro, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySubCategoriaAndSegmentoFiltroOffset(subCategoria, segmento, tipoFiltro, filtro, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresDestaqueBySubCategoria = async function (subCategoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresDestaqueBySubCategoria(subCategoria)
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
exports.getFornecedoresBySegmentoAndCategoriaOffset = async function (segmento, categoria, idCliente, offset) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndCategoriaOffset(segmento, categoria, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresDestaqueBySegmentoAndCategoria = async function (segmento, categoria, idCliente) {
    let dataFornecedores = await fornecedoresData.getFornecedoresDestaqueBySegmentoAndCategoria(segmento, categoria)
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
exports.getFornecedoresBySegmentoAndOrdemOffset = async function (ordem, segmento, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndOrdemOffset(ordem, segmento, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySegmentoAndFiltroOffset = async function (tipoFiltro, filtro, segmento, offset, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedoresBySegmentoAndFiltroOffset(tipoFiltro, filtro, segmento, offset)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }

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
    try {
        return fornecedoresData.updateStatusPagamentoFornecedor(statusPagamento, fk_id)
    } catch (error) {
        throw (error)
    }
}
exports.testeFornecedor = function () {
    try {
        const result = fornecedoresFunctions.tratarCategorias([
            { pk_id: 3, nome: "Artigos de Decoração" },
            { pk_id: 2, nome: "Casamento" },
            { pk_id: 1, nome: "Música" },
            { pk_id: 4, nome: "Paulistano" },
            { pk_id: 5, nome: "Prestígio" }
        ])
        console.log(result)
        return result
    } catch (error) {
        throw (error)
    }
}

exports.loginFornecedor = function (login) {
    try {
        return fornecedoresData.loginFornecedor(login)
    } catch (error) {
        throw (error)
    }
}

exports.pesquisarFornecedoresVip = function (pesquisa) {
    try {
        return fornecedoresData.pesquisarFornecedoresVip(pesquisa)
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresVip = function () {
    try {
        return fornecedoresData.getFornecedoresVip()
    } catch (error) {
        throw (error)
    }
}

exports.getFornecedorById = function (id) {
    try {
        return fornecedoresData.getFornecedorById(id)
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedorByIdPessoa = async function (id, idCliente) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedorByIdPessoa(id)
        dataFornecedores = await fornecedoresFunctions.calcularDistancia(dataFornecedores, idCliente)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedorByIdPessoaSemDistancia = async function (id) {
    try {
        let dataFornecedores = await fornecedoresData.getFornecedorByIdPessoa(id)
        return dataFornecedores
    } catch (error) {
        throw (error)
    }
}

exports.deleteEverythingFornecedor = function (id, idPessoa) {
    try {
        return fornecedoresData.deleteEverythingFornecedor(id, idPessoa)
    } catch (error) {
        throw (error)
    }
}