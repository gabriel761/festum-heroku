const express = require('express');
const clientesService = require('../service/clientesService')
const produtosService = require('../service/produtosService')
const fornecedoresService = require('../service/fornecedoresService')
const pessoaService = require('../service/pessoaService')
const anuncioService = require('../service/anuncioService')
const fornecedoresFunctions = require('../funtions/fornecedoresFunctions')
const categoriasFunctions = require('../funtions/categoriasFunctions')
const ipagFunctions = require('../funtions/ipagFuntions')
const categoriaService = require('../service/categoriasService')
const router = express.Router()
const _ = require('lodash');
const middleware = require('../middleware');
const axios = require("axios")
const nodemailer = require("nodemailer")

//rotas login

router.post('/login-pessoa', async (req, res) => {

    const pessoa = await pessoaService.loginPessoa(req.body)
    if (!pessoa) {
        res.send("Login ou senha incorreta")
    } else {
        res.send(pessoa)
    }
})
router.post('/login-cliente', async (req, res) => {

    const cliente = await clientesService.loginCliente(req.body)
    if (!cliente) {
        res.send("Login ou senha incorreta");
    } else {
        res.send(cliente)
    }
})

router.get('/login-fornecedor/:email', middleware.decodeToken, async (req, res) => {
    const firebaseId = req.user.uid
    const email = req.params.email
    const fornecedor = await fornecedoresService.loginFornecedor({ firebaseId, email })
    if (!fornecedor) {
        res.send("Login ou senha incorreta")
    } else {
        res.send(fornecedor)
    }
})
router.get('/pessoas', async (req, res) => {
    const pessoas = await pessoaService.getPessoas()
    res.json(pessoas);
});

router.get('/teste', async (req, res) => {
    console.log("ipag foi!!!!")
    try {
        const api = axios.default.create({
            baseURL: 'https://api.ipag.com.br',
            timeout: 3000,
            auth: {
                username: "festumbrasil@gmail.com",
                password: "F043-B605F28B-77B89EF6-91CDC155-6012"
            },
            headers: {
                "Content-Type": "application/json",
                "x-api-version": 2
            }
        })
        const responseCliente = await api.request({
            url: "/service/resources/customers",
            method: "POST",
            data: {
                "name": "João Gabriel Broder Palacios",
                "cpf_cnpj": "160.355.617-64",
                "email": "jg.7651@gmail.com",
                "phone": "(21) 96018-3131",
                "address": {
                    "street": "Rua Luiz Paulistano",
                    "number": "290",
                    "district": "Recreio dos Bandeirantes",
                    "complement": "",
                    "city": "Rio de Janeiro",
                    "state": "RJ",
                    "zipcode": "22795-455"
                }
            }
        })
        const responseTokenCartao = await api.request({
            url: "/service/resources/card_tokens",
            method: "POST",
            data: {
                "card": {
                    "holderName": "Joao Gabriel Broder Palacios",
                    "number": "5502 0980 1208 2992",
                    "expiryMonth": "11",
                    "expiryYear": "2030",
                    "cvv": "170"
                },
                "holder": {
                    "name": "Joao Gabriel Broder Palacios",
                    "cpfCnpj": "160.355.617-64",
                    "mobilePhone": "(21) 96018-3131",
                    "birthdate": "1995-07-09",
                    "address": {
                        "street": "Rua Luiz Paulistano",
                        "number": "290",
                        "district": "Recreio dos Bandeirantes",
                        "city": "Rio de Janeiro",
                        "state": "RJ",
                        "zipcode": "22795455"
                    }
                }
            }
        })
        const responseAssinatura = await api.request({
            url: "/service/resources/subscriptions",
            method: "POST",
            data: {
                "is_active": true,
                "profile_id": "Gabriel3",
                "plan_id": 2562,
                "customer_id": responseCliente.data.id,
                "starting_date": "2023-05-10",
                // "closing_date": "0000-00-00",
                "callback_url": "https://malhariaoceanica.com.br/",
                "creditcard_token": responseTokenCartao.data.token
            }
        })

        console.log("response assinatura: ", responseAssinatura.data)
        res.json(responseAssinatura.data)
    } catch (e) {
        console.log("erro ipag: ", e)
        res.json(e)
    }

});

router.get("/testeEmailSend", async (req, res) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "jg.7651@gmail.com",
            pass: "tvmamspkhtueyapb"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const mailSent = await transporter.sendMail({
        text: "Texto do email que vai ser o segundo teste do app festum",
        subject: "Teste do email do app festum",
        from: "festumbrasil@gmail.com",
        replyTo: "festumbrasil@gmail.com",
        to: "jg.7651@gmail.com"
    })
    console.log("mail sent: ", mailSent)
    res.json(mailSent)
})
router.post("/orcamentoEmailSend", async (req, res) => {
    const { nome, emailCliente, telefone, mensagem, emailFornecedor } = req.body
    const body = req.body
    console.log("email cliente: ", emailCliente)
    console.log("email fornecedor: ", emailFornecedor)
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: "jg.7651@gmail.com",
            pass: "tvmamspkhtueyapb"
        },
        tls: {
            rejectUnauthorized: false
        }
    })
    const mailSent = await transporter.sendMail({
        text: `
        Nome: ${nome} \n
        Email: ${emailCliente} \n
        Telefone: ${telefone} \n
        Mensagem: ${mensagem} 
        `,
        subject: "Solicitação de orçamento app festum",
        from: emailCliente,
        replyTo: emailCliente,
        to: emailFornecedor
    })
    console.log("mail sent: ", mailSent)
    res.json(body)
})

router.get('/getUserTypeByUid', middleware.decodeToken, async (req, res) => {
    const uid = req.user.uid
    console.log("uid: ", uid)
    const userType = await pessoaService.getUserTypeByUid(uid)
    console.log("user type: ", userType);
    res.json(userType)
})

router.post('/getByEmail', async (req, res) => {
    console.log("get by email route: ", req.body)
    const result = await pessoaService.getByEmail(req.body)
    console.log(result)
    res.json(result)
})
router.post('/checkIfEmailExists', async (req, res) => {
    console.log("get by email route: ", req.body)
    const result = await pessoaService.checkIfEmailExists(req.body)
    console.log(result)
    res.json(result)
});

router.get('/updateEmail/:email', middleware.decodeToken, async (req, res) => {
    const idFirebase = req.user.uid
    const email = req.params.email
    const result = await pessoaService.updateEmail(email, idFirebase);
    res.json("update e-mail");
})
router.get('/updateFirebaseId/:uid/:email', async (req, res) => {

    const idFirebase = req.params.uid
    const email = req.params.email
    console.log("update firebase id: ", idFirebase)
    console.log("update firebase id: ", email)
    const result = await pessoaService.updateFirebaseId(idFirebase, email);
    res.json("update firebase id")
})
// rotas cliente
router.post('/getCpf', async (req, res) => {
    const cpf = req.body.cpf
    const cliente = await clientesService.checkIfCpfExists(cpf)
    console.log(cliente)
    let response = { error: true, message: "Já existe uma conta com este CPF", data: null }
    if (cliente.length == 0) {
        response = { error: false, message: "sucesso!", data: null }
    }
    res.json(response)
});

router.get('/clientes', async (req, res) => {
    const clientes = await clientesService.getClientes()
    res.json(clientes)
});
router.get('/getclienteAndPessoaByIdFirebase', middleware.decodeToken, async (req, res) => {
    const idFirebase = req.user.uid
    const cliente = await clientesService.getclienteAndPessoaByIdFirebase(idFirebase)
    res.json(cliente)
});
router.get('/clientesByFk_id/:fk_id', middleware.decodeToken, async (req, res) => {
    const fk_id = req.params.fk_id
    const clientes = await clientesService.getByFk_id(fk_id)
    res.json(clientes)
});
router.post('/addCliente', async (req, res) => {
    const cadastro = req.body
    const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, "cliente")
    if (!resultPessoa.error) {
        const resultCliente = await clientesService.postCliente(cadastro, resultPessoa.data.id)
        res.json(resultCliente)
    } else {
        clientesService.deleteById(resultPessoa.data.id)
        res.json(resultPessoa)

    }
});
router.post('/updateCliente', async (req, res) => {
    const cadastro = req.body
    console.log(req.body)
    const resultCliente = await clientesService.updateCliente(cadastro)
    res.json({ error: false, message: "cliente cadastrado com sucesso", data: null })

})
router.get('/clienteByIdPessoa/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    const idFirebase = req.user.uid
    const fornecedores = await clientesService.getClienteByIdPessoa(id);
    res.json(fornecedores)
});
router.post('/addClienteForFornecedor', async (req, res) => {
    const cadastro = req.body

    const resultCliente = await clientesService.postCliente(cadastro, cadastro.fk_fornecedor_pessoa)
    res.json(resultCliente)


});
router.put('clientes/:id', async (req, res) => {

});
router.get('/deleteEverythingCliente/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    clientesService.deleteEverythingCliente(id)
    res.json({ message: "deu bom" })
});


// rotas fornecedor
router.post('/getCnpj', async (req, res) => {
    const cnpj = req.body.cnpj
    const fornecedor = await fornecedoresService.checkIfCnpjExists(cnpj)
    let response = { error: true, message: "Já existe uma conta com este CNPJ", data: null }
    if (fornecedor.length == 0) {
        response = { error: false, message: "sucesso!", data: null }
    }
    res.json(response)
});

router.get('/fornecedoresOffset/:offset', middleware.decodeToken, async (req, res) => {
    console.log("entrou no fornecedores offset")
    const token = req.headers.authorization
    const idCliente = req.user.uid
    const offset = req.params.offset
    console.log("offset: ", offset)
    const fornecedores = await fornecedoresService.getFornecedoresOffset(idCliente, offset)
    res.json(fornecedores)
});
router.get('/fornecedores', middleware.decodeToken, async (req, res) => {

    const token = req.headers.authorization
    const idCliente = req.user.uid
    console.log("id cliente get fornecedores: ", idCliente)
    const fornecedores = await fornecedoresService.getFornecedores(idCliente)
    res.json(fornecedores)
});
router.get('/fornecedoresDestaque', middleware.decodeToken, async (req, res) => {

    const token = req.headers.authorization
    const idCliente = req.user.uid
    console.log("id cliente get fornecedores: ", idCliente)
    const fornecedores = await fornecedoresService.getFornecedoresDestaque(idCliente)
    res.json(fornecedores)
});
// router.get('/fornecedores', async (req, res) => {
//     console.log("entrou no fornecedores offset")
//     const fornecedores = await fornecedoresService.getFornecedores()
//     res.json(fornecedores)
// });
router.get('/fornecedoresSemDistancia', async (req, res) => {
    const fornecedores = await fornecedoresService.getFornecedoresSemDistancia()
    res.json(fornecedores)
});
router.get('/fornecedoresSemDistanciaPreCadastro', async (req, res) => {
    console.log("fornecedores sem distancia")
    const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastro()
    res.json(fornecedores)
});
router.get('/fornecedoresSemDistanciaPreCadastroComStatus/:statusConta', async (req, res) => {
    const statusConta = req.params.statusConta
    const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComStatus(statusConta)
    res.json(fornecedores)
});
router.get('/fornecedoresSemDistanciaPreCadastroComStatusEPlano/:statusConta/:plano', async (req, res) => {
    const statusConta = req.params.statusConta
    const plano = req.params.plano
    const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComStatusEPlano(statusConta, plano)
    res.json(fornecedores)
});
router.get('/fornecedoresSemDistanciaPreCadastroComPlano/:plano', async (req, res) => {
    const plano = req.params.plano
    const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComPlano(plano)
    res.json(fornecedores)
});
router.get('/getIdFornecedorByIdFirebase', middleware.decodeToken, async (req, res) => {
    console.log(req.headers.authorization)
    const idFirebase = req.user.uid
    console.log("id firebase: ", idFirebase)
    const response = await fornecedoresService.getIdFornecedorByIdFirebase(idFirebase)
    console.log("response id fornecedor:", response)
    res.json(response)
});
router.get('/getFornecedorByIdFirebase', middleware.decodeToken, async (req, res) => {
    const idFirebase = req.user.uid
    console.log('id firebase for the win: ', idFirebase)
    const response = await fornecedoresService.getFornecedorByIdFirebase(idFirebase)
    console.log("response id fornecedor:", response)
    res.json(response)
});
router.get('/getFornecedorAndPessoaByIdFirebase', middleware.decodeToken, async (req, res) => {
    const idFirebase = req.user.uid
    console.log('id firebase for the win: ', idFirebase)
    const response = await fornecedoresService.getFornecedorAndPessoaByIdFirebase(idFirebase)
    console.log("response id fornecedor:", response)
    res.json(response)
});

router.get('/fornecedorById/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    const fornecedores = await fornecedoresService.getFornecedorById(id)
    res.json(fornecedores)
});
router.get('/fornecedorByIdPessoa/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    const idFirebase = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedorByIdPessoa(id, idFirebase);
    res.json(fornecedores)
});
router.get('/fornecedorByIdPessoaSemDistancia/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    const idFirebase = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedorByIdPessoaSemDistancia(id);
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmento/:segmento', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresBySegmento(segmento, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresByCategoria/:categoria', middleware.decodeToken, async (req, res) => {
    const categoria = req.params.categoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByCategoria(categoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresDestaqueByCategoria/:categoria', middleware.decodeToken, async (req, res) => {
    const categoria = req.params.categoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresDestaqueByCategoria(categoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresByCategoriaOffset/:categoria/:offset', middleware.decodeToken, async (req, res) => {
    const categoria = req.params.categoria
    const offset = req.params.offset
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByCategoriaOffset(categoria, uid, offset)
    res.json(fornecedores)
});

router.get('/fornecedoresBySegmentoOffset/:categoria/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    const categoria = req.params.categoria
    const ordem = req.params.ordem
    const offset = req.params.offset
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByCategoriaOrdemOffset(categoria, ordem, uid, offset)
    res.json(fornecedores)
});
router.get('/fornecedoresByCategoriaOrdemOffset/:categoria/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const categoria = req.params.categoria
        const ordem = req.params.ordem
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByCategoriaOrdemOffset(categoria, ordem, uid, offset)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
});
router.get('/fornecedoresByCategoriaFiltroOffset/:categoria/:tipoFiltro/:filtro/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const categoria = req.params.categoria
        const tipoFiltro = req.params.tipoFiltro
        const filtro = req.params.filtro
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByCategoriaFiltroOffset(categoria, tipoFiltro, filtro, uid, offset)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoria/:subCategoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoria(subCategoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaOffset/:subCategoria/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaOffset(subCategoria, uid, offset)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaOrdem/:subCategoria/:ordem', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const ordem = req.params.ordem;
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaOrdem(subCategoria, ordem, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoriaOrdemOffset/:subCategoria/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const ordem = req.params.ordem;
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaOrdemOffset(subCategoria, ordem, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoriaFiltro/:subCategoria/:tipoFiltro/:filtro', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const filtro = req.params.filtro;
        const tipoFiltro = req.params.tipoFiltro
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaFiltro(subCategoria, tipoFiltro, filtro, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoriaFiltroOffset/:subCategoria/:tipoFiltro/:filtro/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const filtro = req.params.filtro;
        const tipoFiltro = req.params.tipoFiltro
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaFiltroOffset(subCategoria, tipoFiltro, filtro, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});

router.get('/fornecedoresBySubCategoriaAndSegmento/:subCategoria/:segmento', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmento(subCategoria, segmento, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoOffset/:subCategoria/:segmento/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoOffset(subCategoria, segmento, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoOrdem/:subCategoria/:segmento/:ordem', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const ordem = req.params.ordem
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoOrdem(subCategoria, segmento, ordem, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoOrdemOffset/:subCategoria/:segmento/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const ordem = req.params.ordem
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoOrdemOffset(subCategoria, segmento, ordem, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoFiltro/:subCategoria/:segmento/:tipoFiltro/:filtro', async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const tipoFiltro = req.params.tipoFiltro
        const filtro = req.params.filtro
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoFiltro(subCategoria, segmento,tipoFiltro, filtro, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoFiltroOffset/:subCategoria/:segmento/:tipoFiltro/:filtro/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const tipoFiltro = req.params.tipoFiltro
        const filtro = req.params.filtro
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoFiltroOffset(subCategoria, segmento, tipoFiltro, filtro, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresDestaqueBySubCategoria/:subCategoria', middleware.decodeToken, async (req, res) => {
    const subCategoria = req.params.subCategoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresDestaqueBySubCategoria(subCategoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmentoAndCategoria/:segmento/:categoria', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const categoria = req.params.categoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoria(segmento, categoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmentoAndCategoriaOffset/:segmento/:categoria/:offset', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const categoria = req.params.categoria
    const offset = req.params.offset
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoriaOffset(segmento, categoria, uid, offset)
    res.json(fornecedores)
});
router.get('/fornecedoresDestaqueBySegmentoAndCategoria/:segmento/:categoria', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const categoria = req.params.categoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresDestaqueBySegmentoAndCategoria(segmento, categoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmentoAndCategoriaAndSubCategoria/:segmento/:categoria/:subcategoria', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const categoria = req.params.categoria
    const subcategoria = req.params.subcategoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoriaAndSubCategoria(segmento, categoria, subcategoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeAndCategoria/:nome/:categoria', middleware.decodeToken, async (req, res) => {
    const nome = req.params.nome
    const categoria = req.params.categoria
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByNomeAndCategoria(nome, categoria, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeOrdem/:nome/:ordem', middleware.decodeToken, async (req, res) => {
    const nome = req.params.nome
    const ordem = req.params.ordem
    const uid = req.user.uid
    console.log("nome: ", nome)
    console.log("ordem: ", ordem)
    const fornecedores = await fornecedoresService.getFornecedoresByNomeOrdem(nome, ordem, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeFiltro/:nome/:tipoFiltro/:filtro', middleware.decodeToken, async (req, res) => {
    const nome = req.params.nome
    const filtro = req.params.filtro
    const tipoFiltro = req.params.tipoFiltro
    const uid = req.user.uid
    console.log("nome: ", nome)
    console.log("filtro: ", filtro)
    console.log("tipo filtro: ", tipoFiltro)
    const fornecedores = await fornecedoresService.getFornecedoresByNomeFiltro(nome, filtro, tipoFiltro, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresByFiltroOffset/:tipoFiltro/:filtro/:offset', middleware.decodeToken, async (req, res) => {
    const filtro = req.params.filtro
    const tipoFiltro = req.params.tipoFiltro
    const offset = req.params.offset
    const uid = req.user.uid
    console.log("filtro: ", filtro)
    console.log("tipo filtro: ", tipoFiltro)
    console.log("offset: ", offset)
    const fornecedores = await fornecedoresService.getFornecedoresByFiltroOffset(filtro, tipoFiltro, offset, uid)
    res.json(fornecedores)
});

router.get('/fornecedoresByFiltroCategoriaOffset/:tipoFiltro/:filtro/:categoria/:offset', middleware.decodeToken, async (req, res) => {
    const filtro = req.params.filtro
    const tipoFiltro = req.params.tipoFiltro
    const categoria = req.params.categoria
    const offset = req.params.offset
    const uid = req.user.uid
    console.log("filtro: ", filtro)
    console.log("tipo filtro: ", tipoFiltro);
    console.log("categoria: ", categoria)
    console.log("offset: ", offset)
    const fornecedores = await fornecedoresService.getFornecedoresByFiltroCategoriaOffset(filtro, tipoFiltro, categoria, offset, uid, uid)
    res.json(fornecedores)
});

router.get('/fornecedoresByNome/:nome', middleware.decodeToken, async (req, res) => {
    const nome = req.params.nome
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByNome(nome, uid)
    res.json(fornecedores)
});

router.get('/fornecedoresByOrdem/:ordem', middleware.decodeToken, async (req, res) => {
    const ordem = req.params.ordem
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByOrdem(ordem, uid);
    res.json(fornecedores)
});
router.get('/fornecedoresByOrdemOffset/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    const ordem = req.params.ordem
    const offset = req.params.offset
    console.log("ordem: ", ordem)
    console.log("offset: ", offset);
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByOrdemOffset(ordem, offset, uid);
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeCategoriaAndSegmento/:nome/:categoria/:segmento', middleware.decodeToken, async (req, res) => {
    const nome = req.params.nome
    const categoria = req.params.categoria
    const segmento = req.params.segmento
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresByNomeCategoriaAndSegmento(nome, categoria, segmento, uid)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmentoNomeAndOrdem/:segmento/:nome/:ordem', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const nome = req.params.nome
    const ordem = req.params.ordem
    const uid = req.user.uid
    console.log("ordem: ", ordem)
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoNomesegmentoAndOrdem(nome, ordem, segmento, uid)
    res.json(fornecedores)
});

router.get('/fornecedoresBySegmentoAndNome/:segmento/:nome', middleware.decodeToken, async (req, res) => {
    const segmento = req.params.segmento
    const nome = req.params.nome
    const uid = req.user.uid
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndNome(nome, segmento, uid);
    res.json(fornecedores)
});

router.get('/fornecedoresBySegmentoAndOrdemOffset/:segmento/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const ordem = req.params.ordem
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndOrdemOffset(ordem, segmento, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
    
});
router.get('/fornecedoresBySegmentoAndFiltroOffset/:segmento/:tipoFiltro/:filtro/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const tipoFiltro = req.params.tipoFiltro
        const filtro = req.params.filtro
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndFiltroOffset(tipoFiltro, filtro, segmento, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

})
router.get('/fornecedores-vip', async (req, res) => {
    const fornecedores = await fornecedoresService.getFornecedoresVip()
    console.log(fornecedores);
    res.json(fornecedores)
});

router.post('/addFornecedor', async (req, res) => {
    const cadastro = req.body
    console.log("cadastro fornecedor: ", cadastro)
    try {
        const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, /*cadastro.firebaseId,*/ "fornecedor")
        console.log("add fornecedor result pessoa: ", resultPessoa)

        if (!resultPessoa.error) {
            const resultFornecedor = await fornecedoresService.postFornecedores(cadastro, resultPessoa.data.id);
            console.log("sucesso no cadastro do fornecedor")
            res.json(resultFornecedor)
        } else {
            res.json(resultPessoa)
        }
    } catch (e) {
        console.log("fornecedor não foi cadastrado: ", e)
        res.json(resultPessoa);
    }
});
router.post('/updateFornecedor', async (req, res) => {
    const cadastro = req.body
    console.log("update fornecedor: ", cadastro)
    const resultFornecedor = await fornecedoresService.updateFornecedores(cadastro);
    res.json(resultFornecedor)

});
router.post('/updateFornecedorNebulosa', async (req, res) => {
    const cadastro = req.body
    console.log("update fornecedor: ", cadastro)
    const resultFornecedor = await fornecedoresService.updateFornecedoresNebulosa(cadastro);
    res.json(resultFornecedor)

});
router.post('/updateFornecedorCompletarCadastro', async (req, res) => {
    const cadastro = req.body
    console.log("cadastro update fornecedor: ", cadastro)
    const resultFornecedor = await fornecedoresService.updateFornecedorCompletarCadastro(cadastro);
    res.json({ error: false })

});
router.post('/updateStatusPagamentoFornecedor', middleware.decodeToken, async (req, res) => {
    const { statusPagamento } = req.body
    const uid = req.user.uid
    console.log("status pagamento: ", statusPagamento, "uid: ", uid)
    const fornecedor = await fornecedoresService.getFornecedorByIdFirebase(uid)
    console.log("fornecedor: ", fornecedor)
    await fornecedoresService.updateStatusPagamentoFornecedor(statusPagamento, fornecedor[0].fk_fornecedor_pessoa)
    console.log("update de pagamento funcionou")
    res.json("funcionou")
})
router.get("/getStatusPagamentoFornecedorByIdFirebase", middleware.decodeToken, async (req, res) => {
    const uid = req.user.uid
    const fornecedor = await fornecedoresService.getFornecedorByIdFirebase(uid);
    res.json(fornecedor)
})

router.get('/fornecedoresTeste', async (req, res) => {
    const result = fornecedoresService.testeFornecedor()
    res.json(result)
});
router.put('fornecedores/:id', async (req, res) => {

});
router.delete('fornecedores/:id', async (req, res) => {

});
router.post('/pesquisarFornecedoresVip', async (req, res) => {
    const result = await fornecedoresService.pesquisarFornecedoresVip(req.body)
    res.json(result)
})

router.get("/getFornecedorByEmail/:email", async (req, res) => {
    const email = req.params.email
    const fornecedor = await fornecedoresService.getFornecedorByEmail(email);
    res.json(fornecedor)
})

router.post('/webhookPlanoEstrelarIpag', async (req, res) => {
    const cadastroIpag = req.body

    if (cadastroIpag.retorno) {
        const resultEmail = await fornecedoresService.getFornecedorByEmail(cadastroIpag.retorno[0].cliente.email)
        console.log("resultado do email: ", resultEmail)
        if (resultEmail.length == 0) {
            const cadastro = ipagFunctions.tratarDadosDoFornecedor(cadastroIpag.retorno[0].cliente)
            cadastro.statusPagamento = cadastroIpag.retorno[0].mensagem_transacao
            console.log("cadastro 2: ", cadastro)

            try {
                const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, /*cadastro.firebaseId,*/ "fornecedor")
                console.log("add fornecedor result pessoa: ", resultPessoa)

                if (!resultPessoa.error) {
                    const resultFornecedor = await fornecedoresService.postFornecedores(cadastro, resultPessoa.data.id);
                    console.log("sucesso no cadastro do fornecedor")
                    // res.redirect("https://festum-site.vercel.app/form-precadastro-firebase")
                } else {
                    //res.json(resultPessoa)
                }
            } catch (e) {
                console.log("fornecedor não foi cadastrado: ", e)
                //res.json(e);
            }
        } else if (resultEmail.length == 1) {
            const fornecedorDB = resultEmail[0]


            if (fornecedorDB.cpf && (fornecedorDB.cpf == cadastroIpag.retorno[0].cliente.cpf_cnpj || fornecedorDB.cnpj == cadastroIpag.retorno[0].cliente.cpf_cnpj)) {

                if (cadastroIpag.retorno[0].mensagem_transacao != "cancelado" && cadastroIpag.retorno[0].mensagem_transacao != "CANCELED") {
                    // update do status

                    fornecedoresService.updateStatusPagamentoFornecedor(cadastroIpag.retorno[0].mensagem_transacao, fornecedorDB.fk_fornecedor_pessoa)
                    //res.redirect("https://festum-site.vercel.app/form-precadastro-firebase")
                } else {
                    // res.send("o status é cancelado:")
                }

            } else {

                //res.send( "erro: Existe uma conta com este email, mas os dados não estão coincidindo. Cheque os dados de sua conta no app festum")
            }


        } else {
            // res.send("mais de um email cadastrado")
        }
    } else {
        res.redirect('https://festum-site.vercel.app/form-precadastro-firebase')
    }


})

//rotas produto
router.get('/produtos', async (req, res) => {
    const produtos = await produtosService.getProdutos();
    res.json(produtos)
});

router.get('/produtos/:id', async (req, res) => {
    const id = req.params.id
    const produto = await produtosService.getProdutoById(id)
    console.log(produto)
    res.json(produto)
});
router.get('/getProdutosFromIdFornecedor/:idFornecedor', middleware.decodeToken, async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedor(idFornecedor)
    res.json(produtos)
})
router.get('/getProdutosFromIdFornecedorSite/:idFornecedor', async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedor(idFornecedor)
    res.json(produtos)
})
router.get('/getProdutosFromIdFornecedorProdutos/:idFornecedor', middleware.decodeToken, async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedorProdutos(idFornecedor)
    res.json(produtos)
})
router.get('/getProdutosFromIdFornecedorCombos/:idFornecedor', middleware.decodeToken, async (req, res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedorCombos(idFornecedor)
    res.json(produtos)
})
router.post('/addProduto', middleware.decodeToken, async (req, res) => {
    const produto = req.body
    try {
        await produtosService.postProduto(produto)
    } catch (e) {
        console.log("erro ao adicionar produto: ", e.mensagem)
    }

    res.json({ error: false, message: "Produto cadastrado com sucesso", data: null })
});
router.post('/addProdutoSite', async (req, res) => {
    const produto = req.body
    console.log("adicionar produto", produto)
    try {
        await produtosService.postProduto(produto)
    } catch (e) {
        console.log("erro ao adicionar produto: ", e.message)
    }

    res.json({ error: false, message: "Produto cadastrado com sucesso", data: null })
});
router.get('/deletarProduto/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    await produtosService.deleteProduto(id)
    res.json({ error: false, message: "Produto excluído com sucesso", data: null })
});
router.get('/deletarProdutoSite/:id', async (req, res) => {
    const id = req.params.id
    await produtosService.deleteProduto(id)
    res.json({ error: false, message: "Produto excluído com sucesso", data: null })
});
router.post('/updateProduto', middleware.decodeToken, async (req, res) => {
    const produto = req.body
    const newProduto = await produtosService.updateProduto(produto)
    res.json({ error: false, message: "Produto editado com sucesso", data: newProduto })
});
router.post('/updateProdutoSite', async (req, res) => {
    const produto = req.body
    const newProduto = await produtosService.updateProduto(produto)
    res.json({ error: false, message: "Produto editado com sucesso", data: newProduto })
});
router.put('produtos/:id', async (req, res) => {

});
router.delete('produtos/:id', async (req, res) => {

});

router.post('/pesquisarProdutos', async (req, res) => {
    const result = await produtosService.pesquisarProdutos(req.body)
    res.json(result)
})
router.get("/deleteEverythingFornecedor/:id/:idPessoa", middleware.decodeToken, (req, res) => {
    const id = req.params.id
    const idPessoa = req.params.idPessoa
    fornecedoresService.deleteEverythingFornecedor(id, idPessoa)
    console.log("deu bom")
    res.json({ message: "deu bom" })
})
router.get("/deleteEverythingFornecedorSite/:id/:idPessoa", async (req, res) => {
    const id = req.params.id
    const idPessoa = req.params.idPessoa
    console.log("id fornecedor:", id)
    console.log("id pessoa: ", idPessoa)
    await fornecedoresService.deleteEverythingFornecedor(id, idPessoa)
    console.log("deu bom")
    res.json({ message: "deu bom" })
})

// rotas anuncio
router.post('/addAnuncio', middleware.decodeToken, async (req, res) => {
    const anuncio = req.body
    await anuncioService.postAnuncio(anuncio)
    res.json({ error: false, message: "anuncio criado com sucesso", data: null })
})
router.post('/updateAnuncio', middleware.decodeToken, async (req, res) => {
    const anuncio = req.body
    await anuncioService.updateAnuncio(anuncio)
    res.json({ error: false, message: "anuncio criado com sucesso", data: null })
})
router.get('/getAnuncioTipo/:tipo', middleware.decodeToken, async (req, res) => {
    const tipoAnuncio = req.params.tipo
    const result = await anuncioService.getAnuncioTipo(tipoAnuncio)
    res.json(result)
})
router.get('/getAnuncioByIdFornecedor/:id', middleware.decodeToken, async (req, res) => {
    const id = req.params.id
    const result = await anuncioService.getAnuncioByIdFornecedor(id)
    res.json(result)
})
router.get('/getAnuncioFromId/:id', async (req, res) => {
    const id = req.params.id
    const result = await anuncioService.getAnuncioFromId(id)
    res.json(result)
})
router.get('/deleteAnuncioById/:id', async (req, res) => {
    const id = req.params.id
    const result = await anuncioService.deleteAnuncioById(id)
    res.json(result)
})




// extra data
router.get('/segmentos', async (req, res) => {
    const result = await categoriaService.getSegmentos()
    res.json(result)
})
router.get('/categorias', async (req, res) => {
    const result = await categoriaService.getCategorias()
    res.json(result);
})
router.get('/subcategorias', async (req, res) => {
    const result = await categoriaService.getSubcategorias();
    const resultTratado = categoriasFunctions.criarStringObjetoImagensSubcategorias(result)
    console.log("restultado tratado: ", resultTratado)
    // res.json(result)
    res.json(result)
})
router.get('/subcategoriasByFkId/:fk_id', async (req, res) => {
    // subcategorias by fk_id categorias
    let ids = req.params.fk_id
    ids = JSON.parse(ids)

    const result = await categoriaService.getSubcategoriaByFkId(ids)
    res.json(result)
})
router.get('/subcategoriasByFkIdCategoria/:fk_id', async (req, res) => {
    // subcategorias by fk_id categorias
    let id = req.params.fk_id
    const result = await categoriaService.getSubcategoriaByFkIdCategoria(id)
    res.json(result)
})
router.get('/cidades', middleware.decodeToken, async (req, res) => {
    const result = await categoriaService.getCidades()
    res.json(result);
})


module.exports = router