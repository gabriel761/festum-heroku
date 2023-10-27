exports.telefoneComTipo = (telefones) => {
    console.log(telefones)
    const telefonesString = telefones.map((item) => {
        let telefoneString = item.telefone.replace(/[^0-9]/g, '') // remove todos os caracteres que nao sejam numeros
        if(telefoneString[0] == '0'){
            telefoneString = telefoneString.substring(1, telefoneString.length)
        }
        let telefoneTipo = parseInt( telefoneString[telefoneString.length - 8])
        if(telefoneTipo <= 5){
            telefoneTipo = "fixo"
        }
        if(telefoneTipo >= 6){
            telefoneTipo = "celular"
        }
        const telefoneObj = {telefone: telefoneString, tipo: telefoneTipo, pk_id: item.pk_id}
        return telefoneObj
    })
    
    return telefonesString
}