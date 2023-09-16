const db = require('../infra/database')
const _ = require('lodash')

const getIdByCpf = (cpf) => {
    try {
        console.log("cpf: " + cpf)
       return db.query("select pk_id from cliente where cpf=$1", [cpf])
    } catch (error) {
        throw (error)
    }
}
exports.deleteById = (id) => {
    try {
       return db.query("delete from pessoa where pk_id=$1", [id])
    } catch (error) {
        throw (error)
    }
}

exports.getIdByCpfExport = (cpf) => {
    try {
        console.log(cpf)
        return db.query('select pk_id from cliente where cpf= $1', [cpf])
    } catch (error) {
        throw (error)
    }
}

exports.getClientes = function () {
    try {
        return db.query('select * from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id');
    } catch (error) {
        throw (error)
    }
}
exports.getclienteAndPessoaByIdFirebase = function (idFirebase) {
    try {
        return db.query('select * from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where id_firebase = $1', [idFirebase]);
    } catch (error) {
        throw (error)
    }
}
exports.getByFk_id = function (fk_id) {
    try {
        return db.query('select pk_id from cliente where fK_cliente_pessoa = $1', [fk_id]);
    } catch (error) {
        throw (error)
    }
}
exports.getLocationByFirebaseId = function (idCliente) {
    try {
        console.log(idCliente)
        return db.query('select localizacao from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [idCliente]);
    } catch (error) {
        throw (error)
    }
}
exports.postCliente = async function (cliente, idPessoa) {
    try {
        console.log("id pessoa: ", idPessoa)
        let id = getIdByCpf(cliente.cpf)
        if (!id) {
            await db.query('insert into cliente ( data_nascimento, cpf, telefone, tipo_telefone, instagram, endereco, auth_adm, auth_pag, fk_cliente_pessoa, imagem_perfil, localizacao) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [cliente.dataNasc, cliente.cpf, cliente.tel, cliente.tipoTel, cliente.instagram, cliente.endereco, false, true, idPessoa, cliente.imagem, cliente.localizacao])
            id = getIdByCpf(cliente.cpf)
            if (_.isEmpty(id)) {
                return { error: false, message: "cliente cadastrado com sucesso", data: null }
            } else {
                return { erro: true, message: "erro ao cadastrar cliente", data: { id } }
            }
        } else {
            return { error: true, message: "cpf já existente", data: null }
        }
    } catch (error) {
        throw (error)
    }
}
exports.updateCliente = async function (cliente) {
    try {
        await db.query('update cliente set data_nascimento = $1, cpf = $2, telefone = $3, tipo_telefone = $4, instagram = $5, endereco = $6, auth_adm = $7, auth_pag = $8, imagem_perfil = $9, localizacao = $10 where pk_id = $11 ', [cliente.dataNasc, cliente.cpf, cliente.tel, cliente.tipoTel, cliente.instagram, cliente.endereco, false, true, cliente.imagem, cliente.localizacao, cliente.id])
    } catch (error) {
        throw (error)
    }
}
exports.getClienteByIdPessoa = function (id) {
    try {
        return db.query('select cliente.*, pessoa.email from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where cliente.fk_cliente_pessoa=$1', id);
    } catch (error) {
        throw (error)
    }
}
exports.loginCliente = function (login) {
    try {
        return db.query('select * from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where pessoa.email = $1 and pessoa.id_firebase = $2', [login.email, login.firebaseId]);
    } catch (error) {
        throw (error)
    }
}

exports.deleteEverythingCliente = async function (id) {
    try {
        await db.query('delete from cliente where fk_cliente_pessoa = $1', [id])
        await db.query('delete from pessoa where pk_id = $1', [id])
    } catch (error) {
        throw (error)
    }
}