const db = require('../infra/database')
const _ = require('lodash')

const getIdByCnpj = (cnpj) => {
    console.log(cnpj)
    db.query('select pk_id from fornecedor where cnpj= $1', cnpj)
}

exports.getFornecedores = function () {
    console.log("entrou no data")
    return db.query('select * from fornecedor');
}
exports.getFornecedoresBySegmento = function (segmento) {
    console.log("entrou no data")
    console.log("segmento: ", segmento)
    return db.query(`select * from fornecedor where segmento like '%${segmento}%'`)
}
exports.getFornecedoresBySegmentoAndCategoria = function (segmento, categoria) {
    console.log("entrou no data")
    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like '%${segmento}%' and categoria like '%${categoria}%'`)
}
exports.getFornecedoresVip = function () {
    return db.query('select * from fornecedor where vip=true');
}
exports.postFornecedores = function (fornecedor, idPessoa) {
    console.log(fornecedor)
    let id = getIdByCnpj(fornecedor.cnpj)
    if(_.isEmpty(id)){
        db.query('insert into fornecedor ( nome_loja, cnpj, telefone, instagram, endereco, cidade, palavras_chave, categoria, subcategoria, segmento, imagem, preco, auth_adm, auth_pag, fk_fornecedor_pessoa, vip) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16)', [fornecedor.nomeLoja, fornecedor.cnpj, fornecedor.tel, fornecedor.instagram, fornecedor.endereco, fornecedor.cidade, fornecedor.palavrasChave, fornecedor.categoria, fornecedor.subcategoria, fornecedor.segmento, fornecedor.imagem, fornecedor.preco , false, true, idPessoa, false ])
        id = getIdByCnpj(fornecedor.cnpj)
        if(_.isEmpty(id)){
            return {error: false, message: "Fornecedor cadastrado com sucesso", data: null}
        }else{
            return {error: true, message: "Erro ao cadastrar fornecedor", data: null}
        }
    }else{
        return {error: true, message: "Este cnpj já existe no banco de dados"}
    }
}

exports.loginFornecedor = function (login){
    return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.email = $1 and senha = $2', [login.email, login.senha])  
}

exports.pesquisarFornecedoresVip = function({pesquisa}){
    return db.query("select * from fornecedor where nome_loja like concat('%',$1,'%') and vip= true", pesquisa)
}
exports.getFornecedoresVip = function(){
    console.log("foi")
    return db.query("select * from fornecedor where vip=true" )
}

exports.getFornecedorById = function (id) {
    return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.pk_id=$1', id);
}