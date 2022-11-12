const db = require('../infra/database')


exports.getProdutos = function () {
    return db.query('select * from produto');
}
exports.postProduto = function (produto) {
    
    return db.query('insert into produto (nome_produto, descricao, fotos, preco, categoria) values($1,$2,$3,$4,$5)', [produto.nome, produto.desc, produto.fotos, produto.preco, produto.categoria])
}
exports.pesquisaProdutos = function({pesquisa}){
    console.log(pesquisa)
    return db.query("select * from produto where nome_produto like concat('%',$1,'%')", pesquisa)
}

exports.getProdutoById = function (id) {
    return db.query('select * from produto where pk_id = $1', id);
}