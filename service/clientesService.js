const clientesData = require('../data/clientesData')

exports.getClientes = function () {
    return clientesData.getClientes()
}
exports.postCliente = function (cliente, id) {
    cliente.endereco = `${cliente.endereco}, ${cliente.bairro}, ${cliente.complemento}`
    return clientesData.postCliente(cliente, id)
}

exports.loginCliente = function (login) {
    return clientesData.loginCliente(login)
}
exports.deleteById = function (id) {
    return clientesData.deleteById(id)
}