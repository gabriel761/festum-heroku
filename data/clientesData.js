const db = require('../infra/database')
const _ = require('lodash')

const getIdByCpf = (cpf) => {
    console.log("cpf: "+ cpf)
    db.query("select pk_id from cliente where cpf=$1", [cpf])
}
 exports.deleteById = (id) => {
    db.query("delete from pessoa where pk_id=$1", [id])
}

exports.getIdByCpfExport = (cpf) => {
    console.log(cpf)
    return db.query('select pk_id from cliente where cpf= $1', [cpf])
}

exports.getClientes = function () {
    return db.query('select * from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id');
}
exports.getByFk_id = function (fk_id) {
    return db.query('select pk_id from cliente where fK_cliente_pessoa = $1', [fk_id]);
}
exports.getLocationByFirebaseId = function (idCliente){
    console.log(idCliente)
    return db.query('select localizacao from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where pessoa.id_firebase = $1', [idCliente]);
}
exports.postCliente = async function (cliente, idPessoa) {
    console.log("id pessoa: ", idPessoa)
    let id = getIdByCpf(cliente.cpf)
    if(!id){
        await db.query('insert into cliente ( data_nascimento, cpf, telefone, tipo_telefone, instagram, endereco, auth_adm, auth_pag, fk_cliente_pessoa, imagem_perfil, localizacao) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)', [ cliente.dataNasc, cliente.cpf, cliente.tel, cliente.tipoTel, cliente.instagram, cliente.endereco, false, true, idPessoa, cliente.imagem, cliente.localizacao ])
        id = getIdByCpf(cliente.cpf)
        if(_.isEmpty(id)){
            return {error: false, message: "cliente cadastrado com sucesso", data: null}
        }else{
            return {erro: true, message: "erro ao cadastrar cliente", data:{id}}
        }
    }else{
        return {error: true, message: "cpf já existente", data: null}
    }
}
exports.loginCliente = function (login){
        return db.query('select * from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where pessoa.email = $1 and pessoa.id_firebase = $2', [login.email, login.firebaseId]);
}

exports.deleteEverythingCliente = async function (id) {
   await db.query('delete from cliente where fk_cliente_pessoa = $1', [id])
   await db.query('delete from pessoa where pk_id = $1', [id])
}