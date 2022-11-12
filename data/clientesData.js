const db = require('../infra/database')
const _ = require('lodash')

const getIdByCpf = (cpf) => {
    console.log("cpf: "+ cpf)
    db.query("select pk_id from cliente where cpf=$1", [cpf])
}
 exports.deleteById = (id) => {
    db.query("delete from pessoa where pk_id=$1", [id])
}

exports.getClientes = function () {
    return db.query('select * from cliente');
}
exports.postCliente = function (cliente, idPessoa) {
    let id = getIdByCpf(cliente.cpf)
    if(!id){
        db.query('insert into cliente ( data_nascimento, cpf, telefone, tipo_telefone, instagram, endereco, auth_adm, auth_pag, fk_cliente_pessoa) values($1,$2,$3,$4,$5,$6,$7,$8,$9)', [ cliente.dataNasc, cliente.cpf, cliente.tel, cliente.tipoTel, cliente.instagram, cliente.endereco, false, true, idPessoa ])
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
        return db.query('select * from cliente inner join pessoa on cliente.fk_cliente_pessoa = pessoa.pk_id where pessoa.email = $1 and pessoa.senha = $2', [login.email, login.senha]);
}