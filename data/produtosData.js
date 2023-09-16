const db = require('../infra/database')


exports.getProdutos = function () {
    return db.query('select * from produto');
}
exports.postProduto = function (produto) {
    try {
        return db.query('insert into produto (nome, descricao, imagem, preco_original, preco_final, fk_produto_fornecedor, status, tipo_produto) values($1,$2,$3,$4,$5, $6,$7, $8)', [produto.nome, produto.descricao, produto.imagem, produto.precoOriginal, produto.precoFinal, produto.idFornecedor, produto.status, produto.tipoProduto])
    } catch (error) {
        throw (error)
    }

}

exports.updateProduto = async function (produto) {
    try {
        console.log("update produto", produto)
        await db.query('update produto set nome=$1, descricao=$2, imagem=$3, preco_original=$4, preco_final=$5, status=$6, tipo_produto=$7 where pk_id = $8', [produto.nome, produto.descricao, produto.imagem, produto.precoOriginal, produto.precoFinal, produto.status, produto.tipoProduto, produto.idProduto]);
        return db.query('select * from produto where pk_id = $1', [produto.idProduto])
    } catch (error) {
        throw (error)
    }
}
exports.deleteProduto = function (id) {
    try {
        console.log("delete id: ", id)
        return db.query('delete from produto where pk_id = $1', [id]);
    } catch (error) {
        throw (error)
    }
}

exports.pesquisaProdutos = function ({ pesquisa }) {
    try {
        console.log(pesquisa)
        return db.query("select * from produto where nome_produto like concat('%',$1,'%')", pesquisa)
    } catch (error) {
        throw (error)
    }
}

exports.getProdutosFromIdFornecedor = function (idFornecedor) {
    try {
        return db.query("select * from produto where fk_produto_fornecedor = $1", idFornecedor)
    } catch (error) {
        throw (error)
    }
}
exports.getProdutosFromIdFornecedorProdutos = function (idFornecedor) {
    try {
        return db.query("select * from produto where fk_produto_fornecedor = $1 and tipo_produto = 'produto'", idFornecedor)
    } catch (error) {
        throw (error)
    }
}
exports.getProdutosFromIdFornecedorCombos = function (idFornecedor) {
    try {
        return db.query("select * from produto where fk_produto_fornecedor = $1 and tipo_produto = 'combo'", idFornecedor)
    } catch (error) {
        throw (error)
    }
}

exports.getProdutoById = function (id) {
    try {
        return db.query('select * from produto where pk_id = $1', id);
    } catch (error) {
        throw (error)
    }
}
