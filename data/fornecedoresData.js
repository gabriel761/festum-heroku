const db = require('../infra/database')
const _ = require('lodash')
const { result } = require('lodash')

const getIdByCnpj = (cnpj) => {
    try {
        console.log(cnpj)
        return db.query('select pk_id from fornecedor where cnpj= $1', [cnpj])
    } catch (error) {
        throw (error)
    }
}
exports.getIdByCnpjExport = (cnpj) => {
    try {
        console.log(cnpj)
        return db.query('select pk_id from fornecedor where cnpj= $1', [cnpj])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedores = function () {
    try {
        return db.query("select nome_loja, categoria, imagem, localizacao, preco, fk_fornecedor_pessoa, planos from fornecedor where status_da_conta = 'ativo' or status_da_conta = 'conta gratuita' limit 20 ");
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresDestaque = function () {
    try {
        return db.query("select nome_loja, categoria, imagem, localizacao, preco, fk_fornecedor_pessoa, planos from fornecedor where status_da_conta = 'ativo' limit 20 ");
    } catch (error) {
        throw (error)
    }
}

exports.getFornecedoresOffset = function (offset) {
    try {
        return db.query("select nome_loja, categoria, imagem, localizacao, preco, fk_fornecedor_pessoa, planos from fornecedor where status_da_conta = 'ativo' or status_da_conta = 'conta gratuita' limit 20 offset $1 ", [offset]);
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresSemDistancia = function () {
    try {
        return db.query('SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id');
    } catch (error) {
        throw (error)
    }
}
exports.fornecedoresSemDistanciaPreCadastro = function () {
    try {
        return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE status_da_conta = 'Cadastro incompleto site'");
    } catch (error) {
        throw (error)
    }
}
exports.fornecedoresSemDistanciaPreCadastroComStatus = function (statusConta) {
    try {
        return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE status_da_conta = $1 ORDER BY pk_id DESC LIMIT 100", [statusConta]);
    } catch (error) {
        throw (error)
    }
}
exports.fornecedoresSemDistanciaPreCadastroComStatusEPlano = function (statusConta, plano) {
    try {
        return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE status_da_conta = $1 and planos = $2 ORDER BY pk_id DESC LIMIT 100", [statusConta, plano]);
    } catch (error) {
        throw (error)
    }
}
exports.fornecedoresSemDistanciaPreCadastroComPlano = function (plano) {
    try {
        return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE planos = $1 ORDER BY pk_id DESC LIMIT 100", [plano]);
    } catch (error) {
        throw (error)
    }
}
exports.fornecedoresSemDistanciaPreCadastroComPlanoAsc = function (plano) {
    try {
        return db.query("SELECT f.*, p.email, p.nome, p.sobrenome, p.tipo_pessoa  FROM fornecedor f FULL OUTER JOIN pessoa p ON f.fk_fornecedor_pessoa = p.pk_id WHERE planos = $1 ORDER BY pk_id ASC LIMIT 250", [plano]);
    } catch (error) {
        throw (error)
    }
}
exports.getIdFornecedorByIdFirebase = function (firebaseId) {
    try {
        return db.query('select fornecedor.pk_id from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedorByIdFirebase = function (firebaseId) {
    try {
        return db.query('select fornecedor.*  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedorByEmail = function (email) {
    try {
        return db.query('select fornecedor.*  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.email = $1', [email])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedorAndPessoaByIdFirebase = function (firebaseId) {
    try {
        return db.query('select fornecedor.*, pessoa.email, pessoa.nome, pessoa.sobrenome  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [firebaseId])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySegmento = function (segmento) {
    try {
        // console.log("segmento: ", segmento)
        return db.query(`select * from fornecedor where segmento like $1`, ["%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByCategoria = function (categoria) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where categoria like $1 limit 20`, ["%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresDestaqueByCategoria = function (categoria) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where categoria like $1 and planos = 'Pacote Estrelar' limit 20`, ["%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByCategoriaOffset = function (categoria, offset) {
    try {
        console.log("categoria: ", categoria)
        console.log("offset: ", offset)
        return db.query(`select * from fornecedor where categoria like $1 offset $2 limit 20`, ["%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }
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
exports.getFornecedoresBySubCategoria = function (subCategoria, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and categoria like $2 limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaOffset = function (subCategoria, offset, categoria) {
    try {
        
        return db.query(`select * from fornecedor where subcategoria like $1 and categoria like $2 offset $3 limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaOrdem = function (subCategoria, ordem, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        console.log("ordem: ", ordem)
        return db.query(`select * from fornecedor where subcategoria like $1 and categoria like $2 order by ${ordem} limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaOrdemOffset = function (subCategoria, ordem, offset, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        console.log("ordem: ", ordem)
        return db.query(`select * from fornecedor where subcategoria like $1 and categoria like $2 order by ${ordem} offset ${offset} limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaFiltro = function (subCategoria, tipoFiltro, filtro, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and ${tipoFiltro} ilike '%${filtro}%' and categoria like $2 limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaFiltroOffset = function (subCategoria, tipoFiltro, filtro, offset, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and ${tipoFiltro} ilike '%${filtro}%' and categoria like $2 offset ${offset} limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySubCategoriaAndSegmentoOffset = function (subCategoria, segmento, offset, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and categoria like $3 limit 20 offset $4`, ["%" + subCategoria + "%", "%" + segmento + "%", "%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoOrdem = function (subCategoria, segmento, ordem, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        console.log("subcategoria: ", segmento)
        console.log("subcategoria: ", ordem)
        console.log("subcategoria: ", categoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and categoria like $3 order by ${ordem} limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoOrdemOffset = function (subCategoria, segmento, ordem, offset, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and categoria like $3 order by ${ordem} offset $4 limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", "%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoFiltro = function (subCategoria, segmento, tipoFiltro, filtro, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and ${tipoFiltro} ilike $3 and categoria like $4 limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", "%" + filtro + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySubCategoriaAndSegmentoFiltroOffset = function (subCategoria, segmento, tipoFiltro, filtro, offset, categoria) {
    try {
        console.log("subcategoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and segmento like $2 and ${tipoFiltro} ilike $3 and categoria like $4 offset ${offset} limit 20`, ["%" + subCategoria + "%", "%" + segmento + "%", "%" + filtro + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresDestaqueBySubCategoria = function (subCategoria, categoria) {
    try {
        console.log("categoria: ", subCategoria)
        return db.query(`select * from fornecedor where subcategoria like $1 and planos = 'Pacote Estrelar' and categoria like $2 limit 20`, ["%" + subCategoria + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySegmentoAndCategoria = function (segmento, categoria) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 limit 10`, ["%" + segmento + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySegmentoAndCategoriaOffset = function (segmento, categoria, offset) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 offset $3 limit 20`, ["%" + segmento + "%", "%" + categoria + "%", offset])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresDestaqueBySegmentoAndCategoria = function (segmento, categoria) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 and planos = 'Pacote Estrelar' limit 20`, ["%" + segmento + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySegmentoAndCategoriaAndSubCategoria = function (segmento, categoria, subcategoria) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where segmento like $1 and categoria like $2 and subcategoria like $3`, ["%" + segmento + "%", "%" + categoria + "%", "%" + subcategoria + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByNomeAndCategoria = function (nome, categoria) {
    try {
        console.log("categoria: ", categoria)
        return db.query(`select * from fornecedor where nome_loja ilike $1 and categoria like $2`, ["%" + nome + "%", "%" + categoria + "%"])
    } catch (error) {
        throw (error)
    }
}

exports.getFornecedoresByOrdem = function (ordem) {
    try {
        return db.query(`select * from fornecedor order by $1 asc`, ["%" + ordem + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByOrdemOffset = function (ordem, offset) {
    try {
        console.log("Ordem: ", ordem)
        console.log("offset: ", offset)
        return db.query(`select * from fornecedor order by ${ordem} asc offset $1 limit 20`, [offset])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByNome = function (nome) {
    try {
        console.log("nome ordem:", nome)
        return db.query(`select * from fornecedor where nome_loja ilike $1 limit 10`, ["%" + nome + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByNomeOrdem = function (nome, ordem) {
    try {
        console.log(nome, ordem);

        return db.query(`select * from fornecedor where nome_loja ilike $1 order by ${ordem} asc`, ["%" + nome + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByNomeFiltro = function (nome, filtro, tipoFiltro) {
    try {
        console.log("filtro", filtro)
        console.log("tipo filtro", tipoFiltro)
        return db.query(`select * from fornecedor where nome_loja ilike $1 and ${tipoFiltro} ilike '%${filtro}%'`, ["%" + nome + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByFiltroOffset = function (filtro, tipoFiltro, offset) {
    try {
        console.log("filtro", filtro)
        console.log("tipo filtro", tipoFiltro)
        return db.query(`select * from fornecedor where ${tipoFiltro} ilike '%${filtro}%' offset ${offset} limit 20`)
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByFiltroCategoriaOffset = function (filtro, tipoFiltro, categoria, offset) {
    try {
        console.log("filtro", filtro)
        console.log("tipo filtro", tipoFiltro)
        return db.query(`select * from fornecedor where categoria ilike '%${categoria}%' and ${tipoFiltro} ilike '%${filtro}%' offset ${offset} limit 20`)
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresByNomeCategoriaAndSegmento = function (nome, categoria, segmento) {
    try {
        console.log("categoria: ", categoria);
        return db.query(`select * from fornecedor where nome_loja ilike $1 and categoria like $2 and segmento like $3`, ["%" + nome + "%", "%" + categoria + "%", "%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySegmentoNomeAndOrdem = function (nome, ordem, segmento) {
    try {
        console.log("nome ordem:", ordem)
        return db.query(`select * from fornecedor where segmento like $1 and nome_loja ilike $2 order by $3 asc`, ["%" + nome + "%", "%" + ordem + "%", "%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresBySegmentoAndOrdemOffset = function (ordem, segmento, offset) {
    try {
        console.log("ordem: ", ordem)
        console.log("segmento: ", segmento)
        console.log(offset)
        return db.query(`select * from fornecedor where segmento like $1 order by ${ordem} asc offset ${offset}`, ["%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySegmentoAndFiltroOffset = function (tipoFiltro, filtro, segmento, offset) {
    try {
        return db.query(`select * from fornecedor where segmento like $1 and ${tipoFiltro} like '%${filtro}%' offset ${offset}`, ["%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }

}
exports.getFornecedoresBySegmentoAndNome = function (nome, segmento) {
    try {
        subcategorias

        console.log("nome ordem:", nome);
        return db.query(`select * from fornecedor where nome_loja ilike $1 and segmento like $2`, ["%" + nome + "%", "%" + segmento + "%"])
    } catch (error) {
        throw (error)
    }
}
exports.getFornecedoresVip = function () {
    try {
        return db.query('select * from fornecedor where vip=true')
    } catch (error) {
        throw (error)
    }
}
exports.postFornecedores = async function (fornecedor, idPessoa) {
    try {
        console.log("ultimo log antes do query")
        const result = await db.query('insert into fornecedor ( nome_loja, cnpj, telefone, instagram, instagramLink, endereco, cidade, palavras_chave, categoria, subcategoria, segmento, imagem, preco, auth_adm, auth_pag, fk_fornecedor_pessoa, vip, localizacao, cpf, sugest_subcategoria, galeria, dados_de_interesse, foto_de_fundo, formas_de_pagamento, descricao, cep, numero, complemento, status_da_conta, status_pagamento, planos) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21,$22,$23,$24,$25,$26,$27,$28,$29,$30,$31) returning pk_id', [fornecedor.nomeLoja, fornecedor.cnpj, fornecedor.tel, fornecedor.instagram, fornecedor.instagramLink, fornecedor.endereco, fornecedor.cidade, fornecedor.palavrasChave, fornecedor.categorias, fornecedor.subcategorias, fornecedor.segmentos, fornecedor.imagem, fornecedor.preco, false, true, idPessoa, false, fornecedor.localizacao, fornecedor.cpf, fornecedor.sugestSubcategoria, fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricaoLoja, fornecedor.cep, fornecedor.numero, fornecedor.complemento, fornecedor.statusConta, fornecedor.statusPagamento, fornecedor.plano])
        return { error: false, message: "Fornecedor cadastrado com sucesso", data: result[0] }
    } catch (e) {
        console.log("houve erro:", e)
        await db.query("delete from pessoa where pk_id = $1", [idPessoa])
        return { error: true, message: "Erro ao cadastrar fornecedor", data: null }
    }
}
exports.updateFornecedores = function (fornecedor) {
    try {
        return db.query('update fornecedor set  nome_loja = $1, cnpj = $2, telefone = $3, instagram = $4, instagramLink = $5, endereco = $6, cidade = $7, palavras_chave = $8, categoria = $9, subcategoria = $10, segmento = $11, imagem = $12, preco = $13, localizacao = $14, cpf = $15, sugest_subcategoria = $16, galeria = $17, dados_de_interesse = $18, foto_de_fundo = $19, formas_de_pagamento = $20, descricao = $21, cep = $22, numero = $23, complemento = $24  where pk_id = $25', [fornecedor.nomeLoja, fornecedor.cnpj, fornecedor.tel, fornecedor.instagram, fornecedor.instagramLink, fornecedor.endereco, fornecedor.cidade, fornecedor.palavrasChave, fornecedor.categorias, fornecedor.subcategorias, fornecedor.segmentos, fornecedor.imagem, fornecedor.preco, fornecedor.localizacao, fornecedor.cpf, fornecedor.sugestSubcategoria, fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricaoLoja, fornecedor.cep, fornecedor.numero, fornecedor.complemento, fornecedor.id])
    } catch (error) {
        throw (error)
    }
}
exports.updateFornecedorCompletarCadastro = function (fornecedor) {
    try {
        console.log("completar cadastro dentro do data: ", fornecedor)
        return db.query('update fornecedor set galeria = $1, dados_de_interesse = $2, foto_de_fundo = $3, formas_de_pagamento = $4, descricao = $5, status_da_conta = $6 where fk_fornecedor_pessoa = $7 returning pk_id', [fornecedor.galeria, fornecedor.dadosInteresse, fornecedor.fotoFundo, fornecedor.formaPagamento, fornecedor.descricao, "ativo", fornecedor.fk_fornecedor_pessoa])
    } catch (error) {
        throw (error)
    }
}
exports.updateStatusPagamentoFornecedor = function (statusPagamento, fk_id) {
    try {
        console.log("update status fornecedor: ", fk_id)
        console.log("update status fornecedor: ", statusPagamento)

        return db.query('update fornecedor set status_pagamento = $1 where fk_fornecedor_pessoa = $2 ', [statusPagamento, fk_id])

    } catch (error) {
        throw ("erro no update status de pagamento fornecedor: ", error)
    }

}
exports.loginFornecedor = function (login) {
    try {
        return db.query('select fornecedor.*, pessoa.email, pessoa.nome, pessoa.sobrenome, pessoa.tipo_pessoa  from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where pessoa.email = $1 and id_firebase = $2', [login.email, login.firebaseId])
    } catch (error) {
        throw ("erro no update status de pagamento fornecedor: ", error)
    }
}

exports.pesquisarFornecedoresVip = function ({ pesquisa }) {
    try {
        return db.query("select * from fornecedor where nome_loja like concat('%',$1,'%') and vip= true", pesquisa)
    } catch (error) {
        throw ("erro no update status de pagamento fornecedor: ", error)
    }

}
exports.getFornecedoresVip = function () {
    try {
        console.log("foi")
        return db.query("select * from fornecedor where vip=true")
    } catch (error) {
        throw ("erro no update status de pagamento fornecedor: ", error)
    }
}

exports.getFornecedorById = function (id) {
    try {
        console.log("fornecedor id entrou")
        return db.query('select * from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.pk_id=$1', id);
    } catch (error) {
        throw ("erro no update status de pagamento fornecedor: ", error)
    }
}
exports.getFornecedorByIdPessoa = function (id) {
    try {
        id = parseInt(id)
        console.log("id fk fornecedor pessoa: ", id)
        console.log("fornecedor id entrou")
        return db.query("select fornecedor.*, pessoa.email from fornecedor inner join pessoa on fornecedor.fk_fornecedor_pessoa = pessoa.pk_id where fornecedor.fk_fornecedor_pessoa = '$1'", id);
    } catch (error) {
        throw ("erro no update status de pagamento fornecedor: ", error)
    }
}
exports.deleteEverythingFornecedor = async function (id, idPessoa) {

    try {
        await db.query('delete from anuncio where fk_anuncio_fornecedor = $1', [id])
        await db.query('delete from produto where fk_produto_fornecedor = $1', [id])
        await db.query('delete from assinatura where fk_assinatura_fornecedor = $1', [id])
        await db.query('delete from cartao where fk_cartao_fornecedor = $1', [id])
        await db.query('delete from cupom where fk_cupom_fornecedor = $1', [id])
        await db.query('delete from fornecedor where fk_fornecedor_pessoa = $1', [idPessoa])
        await db.query('delete from cliente where fk_cliente_pessoa = $1', [idPessoa])
        await db.query('delete from pessoa where pk_id = $1', [idPessoa])
    } catch (e) {
        console.log(e)
    }
}



