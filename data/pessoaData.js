const db = require('../infra/database');
const _ = require('lodash')

const getIdByEmail = function (email) {
   return db.query("select pk_id from pessoa where email=$1", [email])
}

exports.getIdByEmailExport = async function (email) {
    console.log("pessoa data: ", email)
    const result = await db.query("select pk_id from pessoa where email=$1", [email])
    console.log("pessoa data result: ", result)
    if(!_.isEmpty(result)){
        return {erorr:false, message: "e-mail econtrado!", data:result[0].pk_id}
    }else{
        return {erorr:true, message: "e-mail não cadastrado...", data:null}
    }
    
 }

exports.getPessoas = function () {
    return db.query("select * from pessoa")
 }
exports.postPessoa = async function(nome, sobrenome, email, id_firebase, tipoPessoa){
    
    let id = await getIdByEmail(email)
    if(_.isEmpty(id)){
        await db.query('insert into pessoa (nome, sobrenome, email, id_firebase, tipo_pessoa) values($1,$2,$3,$4,$5)', [nome, sobrenome, email, id_firebase, tipoPessoa]);
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

