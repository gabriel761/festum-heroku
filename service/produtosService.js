const produtosData = require('../data/produtosData');
const fornecedoresFunctions = require("../funtions/fornecedoresFunctions")


exports.getProdutos = function () {
    return produtosData.getProdutos()
}
exports.postProduto = async function (produto) {
    try {
        produto.precoOriginal = await fornecedoresFunctions.tratarPreco(produto.precoOriginal)
        console.log("preco final", produto.precoFinal)
        produto.precoFinal = await fornecedoresFunctions.tratarPreco(produto.precoFinal)
        return produtosData.postProduto(produto);
    } catch (error) {
        throw error;
    }

}

exports.deleteProduto = function (id) {
    return produtosData.deleteProduto(id)
}
exports.updateProduto = async function (produto) {
    produto.precoOriginal = await fornecedoresFunctions.tratarPreco(produto.precoOriginal)
    console.log("preco final", produto.precoFinal)
    produto.precoFinal = await fornecedoresFunctions.tratarPreco(produto.precoFinal)
    return produtosData.updateProduto(produto);
}

exports.getProdutosFromIdFornecedor = function (idFornecedor) {
    return produtosData.getProdutosFromIdFornecedor(idFornecedor)
}
exports.getProdutosFromIdFornecedorProdutos = function (idFornecedor) {
    return produtosData.getProdutosFromIdFornecedorProdutos(idFornecedor)
}
exports.getProdutosFromIdFornecedorCombos = function (idFornecedor) {
    return produtosData.getProdutosFromIdFornecedorCombos(idFornecedor)
}

exports.pesquisarProdutos = function (pesquisa) {
    return produtosData.pesquisaProdutos(pesquisa)
}

exports.getProdutoById = function (id) {
    return produtosData.getProdutoById(id)
}

