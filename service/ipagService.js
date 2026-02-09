const apiIpagImport = require('../api/apiIpag')
const apiIpag = apiIpagImport.api
exports.ipagRequestTokenizarCartao = async (data) => {
    const {cartao, fornecedor, endereco} = data
    console.log("cartao nascimento: ", cartao)
    try {
        const responseTokenCartao = await apiIpag.request({
            url: "/service/resources/card_tokens",
            method: "POST",
            data: {
                "card": {
                    "holderName": cartao.nome,
                    "number": cartao.nrCartao,
                    "expiryMonth": cartao.validadeMonth,
                    "expiryYear": cartao.validadeYear + '',
                    "cvv": cartao.cvv
                },
                "holder": {
                    "name": `${fornecedor.nome} ${fornecedor.sobrenome}`,
                    "cpfCnpj": fornecedor.cnpj != null ? fornecedor.cnpj : fornecedor.cpf,
                    "mobilePhone": fornecedor.telefone,
                    "birthdate": cartao.nascimento,
                    "address": {
                        "street": endereco.rua,
                        "number": fornecedor.numero,
                        "district": endereco.bairro,
                        "complement": fornecedor.complemento,
                        "city": endereco.cidade,
                        "state": endereco.uf,
                        "zipcode": fornecedor.cep
                    }
                }
            }
        })
        return responseTokenCartao.data
    } catch (e) {
        console.log("erro tokenizando cartao: ", e?.response?.data?.message); 
        throw (e)
    }
}  

exports.pegarPlanoIpagPorId = async (idPlano) => {
    const response = await apiIpag.request({
        url: `/service/resources/plans?id=${idPlano}`,
        method: "GET"
    })
    return response.data
}

exports.pagamentoSimples = async (data) => {
    const {cartao, fornecedor, endereco} = data
    const paymentObj = {
        "amount": submitValuesRef.current.preco_anuncio,
        "callback_url": "https://festum-heroku-production.up.railway.app/webhookPlanoEstrelarIpag",
        "payment": {
            "type": "card",
            "method": cartaoTokenizado.attributes.card.brand,
            "installments": "1",
            "capture": true,
            "card": {
                "holder": cartao.nome,
                "number": cartao.nrCartao,
                "expiry_month": cartao.validadeMonth,
                "expiry_year": cartao.validadeYear,
                "cvv": cartao.cvv
                //"token": cartao.token
            }
        },
        "customer": {
            "name": fornecedor.nome + " " + fornecedor.sobrenome,
            "cpf_cnpj": !!fornecedor.cnpj ? fornecedor.cnpj : fornecedor.cpf,
            "email": fornecedor.email,
            "phone": fornecedor.telefone,
            "billing_address": {
                "street": endereco.current.rua,
                "city": endereco.current.cidade,
                "number": endereco.current.numero,
                "district": endereco.current.bairro,
                "state": endereco.current.uf,
                "complement": endereco.current.complemento,
                "zipcode": endereco.current.cep
            }
        }
    }
    const responseIpag = await apiIpag.request({
        url: "/service/payment",
        method: 'POST',
        data: paymentObj

    })
    return responseIpag.data

}

exports.checarCartaoAntesDoPagamento = async (data) => {
   
    try {
        const { cartao, cartaoTokenizado, fornecedor, endereco } = data
        const paymentObj = {
            "amount": "1.00",
            "callback_url": "https://festum-heroku-production.up.railway.app/webhookPlanoEstrelarIpag",
            "payment": {
                "type": "card",
                "method": cartaoTokenizado.attributes.card.brand,
                "installments": "1",
                "capture": true,
                "card": {
                    "holder": cartao.nome,
                    "number": cartao.nrCartao,
                    "expiry_month": cartao.validadeMonth,
                    "expiry_year": cartao.validadeYear,
                    "cvv": cartao.cvv
                    //"token": cartao.token
                }
            },
            "customer": {
                "name": fornecedor.nome + " " + fornecedor.sobrenome,
                "cpf_cnpj": !!fornecedor.cnpj ? fornecedor.cnpj : fornecedor.cpf,
                "email": fornecedor.email,
                "phone": fornecedor.telefone,
                "billing_address": {
                    "street": endereco.rua,
                    "city": endereco.cidade,
                    "number": endereco.numero,
                    "district": endereco.bairro,
                    "state": endereco.uf,
                    "complement": endereco.complemento,
                    "zipcode": endereco.cep
                }
            }
        }


        const responseIpag = await apiIpag.request({
            url: "/service/payment",
            method: 'POST',
            data: paymentObj

        })
        return responseIpag.data
    }catch(e){
        console.error("erro checando cartao antes do pagamento: ", e)
        throw e
    }
}

exports.ipagRequestAlterarCartaoDaAssinatura = async (data) => {
    const { idAssinatura, token, idPlano } = data
    const response = await apiIpag.request({
        url: "/service/resources/subscriptions?id=" + idAssinatura,
        method: "PUT",
        data: {
            "creditcard_token": token,
            "plan_id": idPlano
        }
    })
    return response.data
}

exports.ipagRequestAtivarAssinatura = async (idAssinatura) => {
    const response = await apiIpag.request({
        url: `/service/resources/subscriptions?id=${idAssinatura}`,
        method: "PUT",
        data: { "is_active": true }
    })
    return response.data
}

exports.ipagRequestCriarClienteEAssinaturaUsandoToken = async (data) => {
    const { cartao, endereco, fornecedor, planId, formatedDate } = data
    try {
        console.log("cartao criar cliente e assinatura usando token: ", cartao)
        console.log("profile id: ", planId)
        const responseCliente = await apiIpag.request({
            url: "/service/resources/customers",
            method: "POST",
            data: {
                "name": `${fornecedor.nome} ${fornecedor.sobrenome}`,
                "cpf_cnpj": fornecedor.cnpj != null ? fornecedor.cnpj : fornecedor.cpf,
                "email": fornecedor.email,
                "phone": fornecedor.telefone,
                "address": {
                    "street": endereco.rua,
                    "number": fornecedor.numero,
                    "district": endereco.bairro,
                    "complement": fornecedor.complemento,
                    "city": endereco.cidade,
                    "state": endereco.uf,
                    "zipcode": fornecedor.cep
                }
            }
        }).catch((e) => { console.log("Erro ao criar cliente: ", e.response.data); throw (new Error("Erro ao criar cliente: " + e.message)) })
        const number = Math.floor(Math.random() * 1000)
        const responseAssinatura = await apiIpag.request({
            url: "/service/resources/subscriptions",
            method: "POST",
            data: {
                "is_active": true,
                "profile_id": fornecedor.email + "-" + planId + "-" + number,
                "plan_id": planId,
                "customer_id": responseCliente.data.id,
                "starting_date": formatedDate,
                // "closing_date": "0000-00-00",
                "callback_url": "https://festum-heroku-production.up.railway.app/webhookPlanoEstrelarIpag",
                "creditcard_token": cartao.token
            }
        }).catch((e) => { console.log("Erro ao criar assinatura", e.response.message);throw (e.response.data.message) })
        return { objCliente: responseCliente.data, objAssinatura: responseAssinatura.data };
    } catch (error) {
        throw (error)
    }
}

