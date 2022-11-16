const pessoaData = require("../data/pessoaData")

exports.postPessoa = function (nome, sobrenome, email, senha, idFirebase, tipoPessoa){
    
    return pessoaData.postPessoa(nome, sobrenome, email, senha, idFirebase, tipoPessoa)
}   

exports.getPessoas = function (){
    return pessoaData.getPessoas()
}
exports.getByEmail = function (pessoa){
    return pessoaData.getIdByEmailExport(pessoa.email)
}