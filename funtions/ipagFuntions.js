exports.tratarDadosDoFornecedor = function (fornecedorIpag){
    const fornecedorReturn = {nome: null, sobrenome: null, cpf: null,cnpj: null, email: null, tel: null, statusPagamento: null, statusConta: "Cadastro incompleto site"}
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