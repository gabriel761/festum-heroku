const clientesData = require("../data/clientesData")
const geolib = require('geolib')
exports.tratarPreco = (preco) => {
    if (typeof preco != "string") {
        return preco
    }
    let newPreco = preco.replace(".", "")
    newPreco = newPreco.replace(",", ".")
    newPreco = newPreco.replace("R$", "")
    console.log(newPreco)
    //newPreco = newPreco.substr(2)
    console.log(newPreco)
    newPreco = parseFloat(newPreco)
    console.log(newPreco)
    return newPreco
}
exports.calcularDistancia = async (data, idCliente) => {
    

    try {
        let localizacaoCliente = await clientesData.getLocationByFirebaseId(idCliente)
        localizacaoCliente = JSON.parse(localizacaoCliente[0].localizacao)

        let newData = data.map((item) => {
            try {
                let distancia = geolib.getPreciseDistance(JSON.parse(item.localizacao), localizacaoCliente)
                item = { ...item, distancia: (distancia / 1000).toFixed(1) }
                console.log("distancia: ", item.distancia)
                return item
            } catch (e) {
                item = { ...item, distancia: "Sem distância" }
                console.log("distancia: ", item.distancia)
                return item
            }

        })
        return newData
    } catch (e) {
        throw(e)
    }

}
exports.ordenarPorDistancia = async (data) => {
    let newData = data.sort((x, y) => {
        return x.distancia - y.distancia
    })
    return newData
}

exports.tratarCategorias = (arr) => {
    let string = ''
    arr.forEach(item => {
        if (string.length == 0) {
            string = item.nome
        } else {
            string = string + ", " + item.nome
        }
    });
    return string
}