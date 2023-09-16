const clientesData = require('../data/clientesData')

exports.getClientes = function () {
    try {
        return clientesData.getClientes()
    } catch (error) {
        throw (error)
    }
}
exports.getclienteAndPessoaByIdFirebase = function (idFirebase) {
    try {
        return clientesData.getclienteAndPessoaByIdFirebase(idFirebase)
    } catch (error) {
        throw (error)
    }
}
exports.getByFk_id = function (fk_id) {
    try {
        return clientesData.getByFk_id(fk_id)
    } catch (error) {
        throw (error)
    }
}
exports.postCliente = function (cliente, id) {
    try {
        console.log("entrou no service cliente")

        return clientesData.postCliente(cliente, id)
    } catch (error) {
        throw (error)
    }
}
exports.updateCliente = function (cliente) {
    try {
        return clientesData.updateCliente(cliente)
    } catch (error) {
        throw (error)
    }
}
exports.getClienteByIdPessoa = function (id) {
    try {
        return clientesData.getClienteByIdPessoa(id)
    } catch (error) {
        throw (error)
    }
}
exports.checkIfCpfExists = async function (cpf) {
    try {
        let data = await clientesData.getIdByCpfExport(cpf)
        return data
    } catch (error) {
        throw (error)
    }
}

exports.loginCliente = function (login) {
    try {
        return clientesData.loginCliente(login)
    } catch (error) {
        throw (error)
    }
}
exports.deleteById = function (id) {
    try {
        return clientesData.deleteById(id)
    } catch (error) {
        throw (error)
    }
}
exports.deleteEverythingCliente = function (id) {
    try {
        return clientesData.deleteEverythingCliente(id)
    } catch (error) {
        throw (error)
    }
}