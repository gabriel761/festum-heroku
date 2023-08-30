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
exports.getFornecedores = function () {
    return db.query("select nome_loja, categoria, imagem, localizacao, preco, fk_fornecedor_pessoa from fornecedor where status_da_conta = 'ativo' or status_da_conta = 'conta gratuita' limit 20 ");
}
exports.getFornecedoresDestaque = function () {
    return db.query("select nome_loja, categoria, imagem, localizacao, preco, fk_fornecedor_pessoa from fornecedor where status_da_conta = 'ativo' limit 20 ");
}

exports.getFornecedoresOffset = function (offset) {
    return db.query("select nome_loja, categoria, imagem, localizacao, preco, fk_fornecedor_pessoa from fornecedor where status_da_conta = 'ativo' or status_da_conta = 'conta gratuita' limit 20 offset $1 ", [offset]);
}
exports.getFornecedoresSemDistancia = function () {

    return db.query('SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id');
}
exports.fornecedoresSemDistanciaPreCadastro = function () {

    return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE status_da_conta = 'Cadastro incompleto site'");
}
exports.fornecedoresSemDistanciaPreCadastroComStatus = function (statusConta) {

    return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE status_da_conta = $1 ORDER BY pk_id DESC LIMIT 100", [statusConta]);
}
exports.fornecedoresSemDistanciaPreCadastroComStatusEPlano = function (statusConta, plano) {

    return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE status_da_conta = $1 and planos = $2 ORDER BY pk_id DESC LIMIT 100", [statusConta, plano]);
}
exports.fornecedoresSemDistanciaPreCadastroComPlano = function (plano) {

    return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE planos = $1 ORDER BY pk_id DESC LIMIT 100", [plano]);
}
exports.getIdFornecedorByIdFirebase = function (firebaseId) {
    return db.query('select fornecedor.pk_id from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
}
exports.getFornecedorByIdFirebase = function (firebaseId) {
    return db.query('select fornecedor.*  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
}
exports.getFornecedorByEmail = function (email) {
    return db.query('select fornecedor.*  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.email = $1', [email])
}
exports.getFornecedorAndPessoaByIdFirebase = function (firebaseId) {
    return db.query('select *  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
}
exports.getFornecedoresBySegmento = function (segmento) {

    // console.log("segmento: ", segmento)
    return db.query(`select * from fornecedor where segmento like $1`, ["%" + segmento + "%"])
}
exports.getFornecedoresByCategoria = function (categoria) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where categoria like $1 limit 20`, ["%" + categoria + "%"])
}
exports.getFornecedoresDestaqueByCategoria = function (categoria) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where categoria like $1 and planos = 'Pacote Estrelar' limit 20`, ["%" + categoria + "%"])
}
exports.getFornecedoresByCategoriaOffset = function (categoria, offset) {

    console.log("categoria: ", categoria)
    console.log("offset: ", offset)
    return db.query(`select * from fornecedor where categoria like $1 offset $2 limit 20`, ["%" + categoria + "%", offset])
}
exports.getFornecedoresByCategoriaOrdemOffset = function (categoria, ordem, offset) {
    try {
        console.log("categoria: ", categoria)
        console.log("ordem: ", ordem)
        console.log("offset: ", offset)
        return db.query(`select * from fornecedor where categoria like $1 order by ${ordem} offset $2 limit 20`, ["%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByCategoriaFiltroOffset = function (categoria, tipoFiltro, filtro, offset) {
    try {
        return db.query(`select * from fornecedor where categoria like $1 and ${tipoFiltro} like '%${filtro}%' offset $2 limit 20`, ["%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoria = function (subCategoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 limit 20`, ["%" + subCategoria + "%"])
    } catch (error) {
        throw(error)
    }
}
exports.getFornecedoresBySubCategoriaOffset = function (subCategoria, offset) {
    try {
    console.log("subcategoria: ", subCategoria)
    return db.query(`select * from fornecedor where subcategoria like $1 offset $2 limit 20`, ["%" + subCategoria + "%", offset])
    } catch (error) {
        throw(error)
    }
}
exports.getFornecedoresBySubCategoriaOrdem = function (subCategoria, ordem) {
    try {
        console.log("subcategoria: ", subCategoria)
        console.log("ordem: ", ordem)
        return db.query(`select * from fornecedor where subcategoria like $1 order by ${ordem} limit 20`, ["%" + subCategoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaOrdemOffset = function (subCategoria, ordem, offset) {
    try {
        console.log("subcategoria: ", subCategoria)
        console.log("ordem: ", ordem)
        return db.query(`select * from fornecedor where subcategoria like $1 order by ${ordem} offset ${offset} limit 20`, ["%" + subCategoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaFiltro = function (subCategoria, tipoFiltro, filtro) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and ${tipoFiltro} ilike '%${filtro}%' limit 20`, ["%" + subCategoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaFiltroOffset = function (subCategoria, tipoFiltro, filtro, offset) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and ${tipoFiltro} ilike '%${filtro}%' offset ${offset} limit 20`, ["%" + subCategoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoOffset = function (subCategoria, segmento, offset) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 limit 20 offset $3`, ["%" + subCategoria + "%", "%" + segmento + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoOrdem = function (subCategoria, segmento, ordem) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 order by ${ordem} limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoOrdemOffset = function (subCategoria, segmento, ordem, offset) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 order by ${ordem} offset $3 limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoFiltro = function (subCategoria, segmento, tipoFiltro, filtro) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and ${tipoFiltro} ilike $3 limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", "%"+filtro+"%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoFiltroOffset = function (subCategoria, segmento, tipoFiltro, filtro, offset) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and ${tipoFiltro} ilike $3 offset ${offset} limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", "%" + filtro + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresDestaqueBySubCategoria = function (subCategoria) {

    console.log("categoria: ", subCategoria)
    return db.query(`select * from fornecedor where subcategoria like $1 and planos = 'Pacote Estrelar' limit 20`, ["%" + subCategoria + "%"])
}
exports.getFornecedoresBySegmentoAndCategoria = function (segmento, categoria) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 limit 10`, ["%" + segmento + "%", "%" + categoria + "%"])
}
exports.getFornecedoresBySegmentoAndCategoriaOffset = function (segmento, categoria, offset) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 offset $3 limit 20`, ["%" + segmento + "%", "%" + categoria + "%", offset])
}
exports.getFornecedoresDestaqueBySegmentoAndCategoria = function (segmento, categoria) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 and planos = 'Pacote Estrelar' limit 20`, ["%" + segmento + "%", "%" + categoria + "%"])
}
exports.getFornecedoresBySegmentoAndCategoriaAndSubCategoria = function (segmento, categoria, subcategoria) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 and subcategoria like $3`, ["%" + segmento + "%", "%" + categoria + "%", "%" + subcategoria + "%"])
}
exports.getFornecedoresByNomeAndCategoria = function (nome, categoria) {

    console.log("categoria: ", categoria)
    return db.query(`select * from fornecedor where nome_loja ilike $1 and categoria like $2`, ["%" + nome + "%", "%" + categoria + "%"])
}

exports.getFornecedoresByOrdem = function (ordem) {
    return db.query(`select * from fornecedor order by $1 asc`, ["%" + ordem + "%"])
}
exports.getFornecedoresByOrdemOffset = function (ordem, offset) {
    console.log("Ordem: ", ordem)
    console.log("offset: ", offset)
    return db.query(`select * from fornecedor order by ${ordem} asc offset $1 limit 20`, [offset])
}
exports.getFornecedoresByNome = function (nome) {

    console.log("nome ordem:", nome)
    return db.query(`select * from fornecedor where nome_loja ilike $1 limit 10`, ["%" + nome + "%"])
}
exports.getFornecedoresByNomeOrdem = function (nome, ordem) {
    console.log(nome, ordem);

    return db.query(`select * from fornecedor where nome_loja ilike $1 order by ${ordem} asc`, ["%" + nome + "%"])
}
exports.getFornecedoresByNomeFiltro = function (nome, filtro, tipoFiltro) {
    console.log("filtro", filtro)
    console.log("tipo filtro", tipoFiltro)
    return db.query(`select * from fornecedor where nome_loja ilike $1 and ${tipoFiltro} ilike '%${filtro}%'`, ["%" + nome + "%"])
}
exports.getFornecedoresByFiltroOffset = function (filtro, tipoFiltro, offset) {
    console.log("filtro", filtro)
    console.log("tipo filtro", tipoFiltro)
    return db.query(`select * from fornecedor where ${tipoFiltro} ilike '%${filtro}%' offset ${offset} limit 20`)
}
exports.getFornecedoresByFiltroCategoriaOffset = function (filtro, tipoFiltro, categoria, offset) {
    console.log("filtro", filtro)
    console.log("tipo filtro", tipoFiltro)
    return db.query(`select * from fornecedor where categoria ilike '%${categoria}%' and ${tipoFiltro} ilike '%${filtro}%' offset ${offset} limit 20`)
}
exports.getFornecedoresByNomeCategoriaAndSegmento = function (nome, categoria, segmento) {

    console.log("categoria: ", categoria);
    return db.query(`select * from fornecedor where nome_loja ilike $1 and categoria like $2 and segmento like $3`, ["%" + nome + "%", "%" + categoria + "%", "%" + segmento + "%"])
}
exports.getFornecedoresBySegmentoNomeAndOrdem = function (nome, ordem, segmento) {

    console.log("nome ordem:", ordem)
    return db.query(`select * from fornecedor where segmento like $1 and nome_loja ilike $2 order by $3 asc`, ["%" + nome + "%", "%" + ordem + "%", "%" + segmento + "%"])
}
exports.getFornecedoresBySegmentoAndOrdemOffset = function (ordem, segmento, offset) {
    try {
        console.log("ordem: ", ordem)
        console.log("segmento: ", segmento)
        console.log(offset)
        return db.query(`select * from fornecedor where segmento like $1 order by ${ordem} asc offset ${offset}`, ["%" + segmento + "%" ])
    } catch (error) {
        throw(error)
    }
    
}
exports.getFornecedoresBySegmentoAndFiltroOffset = function (tipoFiltro,filtro, segmento, offset) {
    try {
        return db.query(`select * from fornecedor where segmento like $1 and ${tipoFiltro} like '%${filtro}%' offset ${offset}`, ["%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySegmentoAndNome = function (nome, segmento) {
    subcategorias

    console.log("nome ordem:", nome);
    return db.query(`select * from fornecedor where nome_loja ilike $1 and segmento like $2`, ["%" + nome + "%", "%" + segmento + "%"])
}
exports.getFornecedoresVip = function () {
    return db.query('select * from fornecedor where vip=true')
}
exports.postFornecedores = async function (fornecedor, idPessoa) {

    //let id = await getIdByCnpj(fornecedor.cnpj)

    let error = true
    let result = null;

    //if(id.length == 0){
    try {
        console.log("ultimo log antes do query")
        result = await db.query('insert into fornecedor ( nome_loja, cnpj, telefone, instagram, instagramLink, endereco, cidade, palavras_chave, categoria, subcategoria, segmento, imagem, preco, auth_adm, auth_pag, fk_fornecedor_pessoa, vip, localizacao, cpf, sugest_subcategoria, galeria, dados_de_interesse, foto_de_fundo, formas_de_pagamento, descricao, cep, numero, complemento, status_da_conta, status_pagamento, planos) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31)', [fornecedor.nomeLoja, fornecedor.cnpj, fornecedor.tel, fornecedor.instagram, fornecedor.instagramLink, fornecedor.endereco, fornecedor.cidade, fornecedor.palavrasChave, fornecedor.categorias, fornecedor.subcategorias, fornecedor.segmentos, fornecedor.imagem, fornecedor.preco, false, true, idPessoa, false, fornecedor.localizacao, fornecedor.cpf, fornecedor.sugestSubcategoria, fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricaoLoja, fornecedor.cep, fornecedor.numero, fornecedor.complemento, fornecedor.statusConta, fornecedor.statusPagamento, fornecedor.plano])
        return { error: false, message: "Fornecedor cadastrado com sucesso", data: null }


    } catch (e) {

        console.log("houve erro:", e)
        await db.query("delete from pessoa where pk_id = $1", [idPessoa])
        return { error: true, message: "Erro ao cadastrar fornecedor", data: null }
    }




    // }else{
    console.log("já existe cnpj")
    await db.query("delete from pessoa where pk_id = $1", [idPessoa])
    return { error: true, message: "Este cnpj já existe no banco de dados" }
    // }
}
exports.updateFornecedores = function (fornecedor) {
    return db.query('update fornecedor set  nome_loja = $1, cnpj = $2, telefone = $3, instagram = $4, instagramLink = $5, endereco = $6, cidade = $7, palavras_chave = $8, categoria = $9, subcategoria = $10, segmento = $11, imagem = $12, preco = $13, localizacao = $14, cpf = $15, sugest_subcategoria = $16, galeria = $17, dados_de_interesse = $18, foto_de_fundo = $19, formas_de_pagamento = $20, descricao = $21, cep = $22, numero = $23, complemento = $24, status_da_conta = $25 where pk_id = $26', [fornecedor.nomeLoja, fornecedor.cnpj, fornecedor.tel, fornecedor.instagram, fornecedor.instagramLink, fornecedor.endereco, fornecedor.cidade, fornecedor.palavrasChave, fornecedor.categorias, fornecedor.subcategorias, fornecedor.segmentos, fornecedor.imagem, fornecedor.preco, fornecedor.localizacao, fornecedor.cpf, fornecedor.sugestSubcategoria, fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricaoLoja, fornecedor.cep, fornecedor.numero, fornecedor.complemento, fornecedor.statusConta, fornecedor.id])
}


exports.updateFornecedorCompletarCadastro = function (fornecedor) {
    console.log("completar cadastro dentro do data: ", fornecedor)
    return db.query('update fornecedor set galeria = $1, dados_de_interesse = $2, foto_de_fundo = $3, formas_de_pagamento = $4, descricao = $5, status_da_conta = $6 where fk_fornecedor_pessoa = $7', [fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricao, "ativo", fornecedor.fk_fornecedor_pessoa])
}
exports.updateStatusPagamentoFornecedor = function (statusPagamento, fk_id) {
    return db.query('update fornecedor set status_pagamento = $1 where fk_fornecedor_pessoa = $2 ', [statusPagamento, fk_id])
}

exports.loginFornecedor = function (login) {
    return db.query('select fornecedor.*, pessoa.email, pessoa.nome, pessoa.sobrenome, pessoa.tipo_pessoa  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.email = $1 and id_firebase = $2', [login.email, login.firebaseId])
}

exports.pesquisarFornecedoresVip = function ({ pesquisa }) {
    return db.query("select * from fornecedor where nome_loja like concat('%',$1,'%') and vip= true", pesquisa)
}
exports.getFornecedoresVip = function () {
    console.log("foi")
    return db.query("select * from fornecedor where vip=true")
}

exports.getFornecedorById = function (id) {
    console.log("fornecedor id entrou")
    return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.pk_id=$1', id);
}
exports.getFornecedorByIdPessoa = function (id) {
    console.log("fornecedor id entrou")
    return db.query('select fornecedor.*, pessoa.email from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.fk_fornecedor_pessoa=$1', id);
}
exports.deleteEverythingFornecedor = async function (id, idPessoa) {

    try {
        await db.query('delete from anuncio where fk_anuncio_fornecedor = $1', [id])
        await db.query('delete from produto where fk_produto_fornecedor = $1', [id])
        await db.query('delete from fornecedor where fk_fornecedor_pessoa = $1', [idPessoa])
        await db.query('delete from pessoa where pk_id = $1', [idPessoa]);
    } catch (e) {
        console.log(e)
    }
}