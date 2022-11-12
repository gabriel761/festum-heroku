const produtosData = require('../data/produtosData');



exports.getProdutos = function () {
    return produtosData.getProdutos()
}
exports.postProduto = function (produto) {
    
     produtosData.postProduto(produto);
}

exports.pesquisarProdutos = function (pesquisa){
    return produtosData.pesquisaProdutos(pesquisa)
}

exports.getProdutoById = function(id){
    return produtosData.getProdutoById(id)
}

