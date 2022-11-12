const pessoaData = require("../data/pessoaData")

exports.postPessoa = function (nome, sobrenome, email, senha, tipoPessoa){
    
    return pessoaData.postPessoa(nome, sobrenome, email, senha, tipoPessoa)
}   

exports.getPessoas = function (){
    return pessoaData.getPessoas()
}