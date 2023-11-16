exports.tratarDadosDoFornecedor = function (fornecedorIpag){
    const fornecedorReturn = {nome: null, sobrenome: null, cpf: null,cnpj: null, email: null, tel: null, statusPagamento: null, statusConta: "Cadastro incompleto site", plano: "Pacote Estrelar"}
    if(typeof fornecedorIpag === 'object'){
        fornecedorReturn.nome = fornecedorIpag.nome.substring(0, fornecedorIpag.nome.indexOf(" "))
        fornecedorReturn.sobrenome = fornecedorIpag.nome.substring(fornecedorIpag.nome.indexOf(" ")+ 1, fornecedorIpag.nome.length)
        fornecedorReturn.email = fornecedorIpag.email
        fornecedorReturn.tel = fornecedorIpag.telefone
        fornecedorReturn.cpf = fornecedorIpag.cpf_cnpj.length == 14?fornecedorIpag.cpf_cnpj:null
        fornecedorReturn.cnpj = fornecedorIpag.cpf_cnpj.length == 18?fornecedorIpag.cpf_cnpj:null
    }
    return fornecedorReturn
}

exports.mensagemStatusContaIpag = (statusNumber) => {
    if(typeof statusNumber == "string"){
        statusNumber = parseInt(statusNumber)
    }
    switch (statusNumber) {
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