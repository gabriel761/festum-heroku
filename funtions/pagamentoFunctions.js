

exports.checarSePrecisaDeDataBloqueio = (status) => {
    let data_bloqueio = null
    let today =  new Date()
    switch(status){
        case "CACELLED":
        case "cancelado":
        case "CAPTURED":
        case "aprovado e capturado":
            break;
        default :
            data_bloqueio = today.setDate(today.getDate() + 15)
            data_bloqueio = `${today.getFullYear()}-${today.getMonth()+1}-${today.getDate()+1}`
    }
    return data_bloqueio
}

exports.gerarDataBloqueio = () => {
    let yourDate = new Date()
    yourDate = yourDate.setDate(yourDate.getDate() + 15);
    yourDate = new Date(yourDate)
    let formatedDate = `${yourDate.getFullYear()}-${yourDate.getMonth() + 1 > 10 ? yourDate.getMonth() + 1 : `0${yourDate.getMonth() + 1}`}-${yourDate.getDate() >= 10 ? yourDate.getDate() : `0${yourDate.getDate()}`}`
    return formatedDate
}


exports.mensagemStatusContaIpag = (statusNumber) => {
    switch(statusNumber){
        case 1:
        return "Iniciado"
        break;
        case 2:
            return "Boleto Impresso"
        break;
        case 3:
            return "Cancelado"
        break;
        case 4:
            return "Em análise"
        break;
        case 5:
            return "Pré-Autorizado"
        break;
        case 6:
            return "Autorizado Valor Parcial"
        break;
        case 7:
            return "Recusado"
        break;
        case 8:
            return "Aprovado e Capturado"
        break;
        case 9:
            return "Chargeback"
        break;
        case 10:
            return "Em Disputa"
        break;
        default:
            return "Erro ao receber status"
    }
}