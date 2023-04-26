const db = require('../infra/database')
const _ = require('lodash')
const { result } = require('lodash')

const getIdByCnpj = (cnpj) => {
    console.log(cnpj)
    return db.query('select pk_id from fornecedor where cnpj= $1', [cnpj])
}
exports.getIdByCnpjExport = (cnpj) => {
    console.log(cnpj)
    return db.query('select pk_id from fornecedor where cnpj= $1', [cnpj])
}

exports.getFornecedores = function (offset) {
   
    return db.query('select nome_loja, categoria, imagem, localizacao, preco from fornecedor limit 5 offset $1', [offset]);
}
exports.getFornecedoresSemDistancia = function () {
   
    return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id');
}
exports.getIdFornecedorByIdFirebase = function (firebaseId) {
    return db.query('select fornecedor.pk_id from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
}
exports.getFornecedorByIdFirebase = function (firebaseId) {
    return db.query('select fornecedor.*  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
}
exports.getFornecedorAndPessoaByIdFirebase = function (firebaseId) {
    return db.query('select *  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
}
exports.getFornecedoresBySegmento = function (segmento) {
   
   // console.log("segmento: ", segmento)
    return db.query(`select * from fornecedor where segmento like $1`,["%"+segmento+"%"])
}
exports.getFornecedoresByCategoria = function (categoria) {
   
    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where categoria like $1`,["%"+categoria+"%"])
}
exports.getFornecedoresBySubCategoria = function (subCategoria) {
   
    console.log("categoria: ", subCategoria)
    return db.query(`select * from fornecedor where subcategoria like $1`,["%"+subCategoria+"%"])
}
exports.getFornecedoresBySegmentoAndCategoria = function (segmento, categoria) {
   
    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like $1 and categoria like $2`, ["%"+segmento+"%", "%"+categoria+"%" ])
}
exports.getFornecedoresBySegmentoAndCategoriaAndSubCategoria = function (segmento, categoria, subcategoria) {
   
    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 and subcategoria like $3`, ["%"+segmento+"%", "%"+categoria+"%", "%"+subcategoria+"%" ])
}
exports.getFornecedoresByNomeAndCategoria = function (nome, categoria) {
   
    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where nome_loja ilike $1 and categoria like $2`, ["%"+nome+"%","%"+categoria+"%"])
}

exports.getFornecedoresByOrdem = function (ordem ) {
    return db.query(`select * from fornecedor order by $1 asc`,["%"+ordem+"%"])
}
exports.getFornecedoresByNome = function (nome ) {
   
    console.log("nome ordem:", nome)
    return db.query(`select * from fornecedor where nome_loja ilike $1`, ["%"+nome+"%"])
}
exports.getFornecedoresByNomeOrdem = function (nome, ordem ) {
   console.log(nome,ordem);
    
    return db.query(`select * from fornecedor where nome_loja ilike $1 order by ${ordem} asc`, ["%"+nome+"%"])
}
exports.getFornecedoresByNomeFiltro = function (nome, filtro, tipoFiltro ) {
     console.log("filtro", filtro)
     console.log("tipo filtro", tipoFiltro)
     return db.query(`select * from fornecedor where nome_loja ilike $1 and ${tipoFiltro} ilike '%${filtro}%'`, ["%"+nome+"%"])
 }
exports.getFornecedoresByNomeCategoriaAndSegmento = function (nome, categoria, segmento) {
   
    console.log("categoria: ", categoria);
    return db.query(`select * from fornecedor where nome_loja ilike $1 and categoria like $2 and segmento like $3`, ["%"+nome+"%","%"+categoria+"%","%"+segmento+"%"])
}
exports.getFornecedoresBySegmentoNomeAndOrdem = function (nome, ordem, segmento) {
   
    console.log("nome ordem:", ordem)
    return db.query(`select * from fornecedor where segmento like $1 and nome_loja ilike $2 order by $3 asc`, ["%"+nome+"%","%"+ordem+"%","%"+segmento+"%"])
}
exports.getFornecedoresBySegmentoAndOrdem = function (ordem, segmento) {
    return db.query(`select * from fornecedor where segmento like $1 order by $2 asc`, ["%"+ordem+"%","%"+segmento+"%"])
}
exports.getFornecedoresBySegmentoAndNome = function (nome, segmento) {subcategorias
   
    console.log("nome ordem:", nome);
    return db.query(`select * from fornecedor where nome_loja ilike $1 and segmento like $2`,["%"+nome+"%", "%"+segmento+"%"])
}
exports.getFornecedoresVip = function () {
    return db.query('select * from fornecedor where vip=true')
}
exports.postFornecedores = async function (fornecedor, idPessoa) {
    
    //let id = await getIdByCnpj(fornecedor.cnpj)
    
    let error = true
    let result = null;
    
    //if(id.length == 0){
        
            console.log("ultimo log antes do query")
            result = await db.query('insert into fornecedor ( nome_loja, cnpj, telefone, instagram, instagramLink, endereco, cidade, palavras_chave, categoria, subcategoria, segmento, imagem, preco, auth_adm, auth_pag, fk_fornecedor_pessoa, vip, localizacao, cpf, sugest_subcategoria, galeria, dados_de_interesse, foto_de_fundo, formas_de_pagamento, descricao) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25)', [fornecedor.nomeLoja, fornecedor.cnpj, fornecedor.tel, fornecedor.instagram,fornecedor.instagramLink, fornecedor.endereco, fornecedor.cidade, fornecedor.palavrasChave, fornecedor.categorias, fornecedor.subcategorias, fornecedor.segmentos, fornecedor.imagem, fornecedor.preco , false, true, idPessoa, false, fornecedor.localizacao, fornecedor.cpf, fornecedor.sugestSubcategoria, fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricaoLoja ])
            await getIdByCnpj()
            if(result === null){
                console.log("houve erro")
                await db.query("delete from pessoa where pk_id = $1",[idPessoa])
                return {error: true, message: "Erro ao cadastrar fornecedor", data: null}
            }else{
                return {error: false, message: "Fornecedor cadastrado com sucesso", data: null}
            }
      
   // }else{
        console.log("já existe cnpj")
        await db.query("delete from pessoa where pk_id = $1",[idPessoa]);
        return {error: true, message: "Este cnpj já existe no banco de dados"}
   // }
}
exports.updateStatusPagamentoFornecedor = function (statusPagamento, fk_id){
    return db.query('update fornecedor set status_pagamento = $1 where fk_fornecedor_pessoa = $2 ', [statusPagamento, fk_id ])
}

exports.loginFornecedor = function (login){
    return db.query('select fornecedor.*, pessoa.email, pessoa.nome, pessoa.sobrenome, pessoa.tipo_pessoa  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.email = $1 and id_firebase = $2', [login.email, login.firebaseId])  
}

exports.pesquisarFornecedoresVip = function({pesquisa}){
    return db.query("select * from fornecedor where nome_loja like concat('%',$1,'%') and vip= true", pesquisa)
}
exports.getFornecedoresVip = function(){
    console.log("foi")
    return db.query("select * from fornecedor where vip=true" )
}

exports.getFornecedorById = function (id) {
    console.log("fornecedor id entrou")
    return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.pk_id=$1', id);
}
exports.getFornecedorByIdPessoa = function (id) {
    console.log("fornecedor id entrou")
    return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.fk_fornecedor_pessoa=$1', id);
}
exports.deleteEverythingFornecedor = async function (id, idPessoa) {
    await db.query('delete from anuncio where fk_anuncio_fornecedor = $1', [id])
    await db.query('delete from produto where fk_produto_fornecedor = $1', [id])
    await db.query('delete from fornecedor where fk_fornecedor_pessoa = $1', [idPessoa])
    await db.query('delete from pessoa where pk_id = $1', [idPessoa]);
 }