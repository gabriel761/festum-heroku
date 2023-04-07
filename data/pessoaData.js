const db = require('../infra/database');
const _ = require('lodash')

const getIdByEmail = function (email) {
   return db.query("select pk_id from pessoa where email=$1", [email])
}

exports.getIdByEmailExport = async function (email) {
    console.log("pessoa data: ", email)
    const result = await db.query("select pk_id from pessoa where email=$1", [email])
    console.log("pessoa data result: ", result)
    if(result.length != 0){
        return {erorr:false, message: "e-mail econtrado!", data:result[0].pk_id}
    }else{
        return {erorr:true, message: "e-mail não cadastrado...", data:null}
    }
    
 }
 exports.loginPessoa = function (pessoa) {
    console.log("pessoa login: ", pessoa)
    return db.query("select tipo_pessoa from pessoa where id_firebase = $1 and email = $2", [pessoa.firebaseId, pessoa.email])
 }
 exports.checkIfEmailExistsExport = async function (email) {
    console.log("pessoa data: ", email);
    const result = await db.query("select pk_id from pessoa where email=$1", [email])
    console.log("pessoa data result: ", result)
    console.log(result.length != 0)
    if(result.length == 0){
        return {error:false, message: "sucesso!", data:null}
    }else{
        return {error:true, message: "Email já existente no cadastro", data:null}
    }
    
 }

exports.getPessoas = function () {
    return db.query("select * from pessoa")
 }
 exports.getUserTypeByUid = function (uid) {
    return db.query("select tipo_pessoa from pessoa where id_firebase = $1", [uid])
 }
 exports.updateEmail = function (email, idFirebase) {
    console.log("email: ", email)
    console.log("id firebase: ", idFirebase);
    return db.query('update pessoa set email = $1 where id_firebase = $2',[email, idFirebase])
 }
 exports.updateFirebaseId = function (idFirebase, email) {
    console.log("id firebase: ", idFirebase, email);
    return db.query('update pessoa set id_firebase = $1 where email = $2 ',[ idFirebase, email])
 }
exports.postPessoa = async function(nome, sobrenome, email,/* id_firebase,*/ tipoPessoa){
    
    let id = await getIdByEmail(email)
    console.log("tipo pessoa data: ",tipoPessoa)
    if(_.isEmpty(id)){
        await db.query('insert into pessoa (nome, sobrenome, email, tipo_pessoa) values($1,$2,$3,$4)', [nome, sobrenome, email, tipoPessoa])
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

