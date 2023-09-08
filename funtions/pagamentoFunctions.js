

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