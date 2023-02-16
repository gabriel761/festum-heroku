const clientesData = require("../data/clientesData")
const geolib = require('geolib')
exports.tratarPreco = (preco) => {
    if (typeof preco != "string"){
        return preco
    }
    let newPreco = preco.replace(".", "")
     newPreco = newPreco.replace(",",".")
    console.log(newPreco)
    newPreco = newPreco.substr(2)
    console.log(newPreco)
    newPreco = parseFloat(newPreco)
    console.log(newPreco)
    return newPreco
}
exports.calcularDistancia = async (data, idCliente)=> {
    let  localizacaoCliente = await clientesData.getLocationByFirebaseId(idCliente)

    localizacaoCliente  = JSON.parse(localizacaoCliente[0].localizacao)
        
    let newData = data.map((item) => {
        let distancia = geolib.getPreciseDistance(JSON.parse(item.localizacao), localizacaoCliente)
        item = {...item, distancia: (distancia/ 1000).toFixed(1)}
        console.log("distancia: ",item.distancia)
        return item
    })
    
    
   return newData
    
}