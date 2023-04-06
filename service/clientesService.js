const clientesData = require('../data/clientesData')

exports.getClientes = function () {
    return clientesData.getClientes()
}
exports.getByFk_id = function (fk_id) {
    return clientesData.getByFk_id(fk_id)
}
exports.postCliente = function (cliente, id) {
    console.log("entrou no service cliente")
    
    return clientesData.postCliente(cliente, id)
}
exports.checkIfCpfExists = async function (cpf) {
    let  data = await clientesData.getIdByCpfExport(cpf)
    return data
}

exports.loginCliente = function (login) {
    return clientesData.loginCliente(login)
}
exports.deleteById = function (id) {
    return clientesData.deleteById(id)
}
exports.deleteEverythingCliente = function (id){
    return clientesData.deleteEverythingCliente(id)
}