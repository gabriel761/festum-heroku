const pessoaData = require("../data/pessoaData")
const clientesData = require("../data/clientesData")
const fornecedoresData = require("../data/fornecedoresData")
const pessoaFunctions = require("../funtions/pessoaFunctions")
exports.postPessoa = function (nome, sobrenome, email, senha, /*idFirebase,*/ tipoPessoa) {

    return pessoaData.postPessoa(nome, sobrenome, email, senha, /*idFirebase,*/ tipoPessoa)
}

exports.getPessoas = function () {
    return pessoaData.getPessoas()
}

exports.getByEmail = function (pessoa) {
    return pessoaData.getIdByEmailExport(pessoa.email)
}
exports.loginPessoa = async function (pessoa) {
    console.log("pessoa: ", pessoa)
    const result = await pessoaData.loginPessoa(pessoa)
    console.log("tipo pessoa: ", result)
    const tipoPessoa = result[0]?.tipo_pessoa
    console.log(tipoPessoa)
    if (tipoPessoa == "cliente") {
        return clientesData.loginCliente(pessoa)
    } else if (tipoPessoa == "fornecedor") {
        return fornecedoresData.loginFornecedor(pessoa)
    } else if (tipoPessoa == "admin") {
        return result[0]
    } else {
        return { error: true, message: "Login ou senha incorreta", data: null }
    }
}
exports.checkIfEmailExists = function (pessoa) {
    return pessoaData.checkIfEmailExistsExport(pessoa.email)
}
exports.updateEmail = function (email, idFirebase) {
    return pessoaData.updateEmail(email, idFirebase)
}
exports.updateFirebaseId = function (idFirebase, email) {
    return pessoaData.updateFirebaseId(idFirebase, email)
}
exports.getUserTypeByUid = function (uid) {
    return pessoaData.getUserTypeByUid(uid)
}