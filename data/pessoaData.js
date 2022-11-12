const db = require('../infra/database');
const _ = require('lodash')

const getIdByEmail = function (email) {
   return db.query("select pk_id from pessoa where email=$1", [email])
}

exports.getPessoas = function () {
    return db.query("select * from pessoa")
 }
exports.postPessoa = async function(nome, sobrenome, email, senha, tipoPessoa){
    
    let id = await getIdByEmail(email)
    if(_.isEmpty(id)){
        await db.query('insert into pessoa (nome, sobrenome, email, senha, tipo_pessoa) values($1,$2,$3,$4,$5)', [nome, sobrenome, email, senha, tipoPessoa]);
        id = await getIdByEmail(email)
        console.log(id)
        if(!_.isEmpty(id) ){
            return {error: false, message: "pessoa cadastrada com sucesso", data: {id:id[0].pk_id}}
        }else{
            return {error: true, message: "erro ao cadastrar pessoa", data: null}
        }
    }else{
        return {error: true, message: "email já existente no cadastro", data: {email}}
    }

}

