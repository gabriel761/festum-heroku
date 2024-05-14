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
const pagamentoService = require("../service/pagamentoService")
const assinaturaService = require("../service/assinaturaService")
const pagamentosFunctions = require("../funtions/pagamentoFunctions")
const logsData = require("../data/logsData")
const CryptoJS = require("crypto-js");
const telefoneFunctions = require("../funtions/telefoneFunctions")
const cupomService = require('../service/cupomService')
const firebaseAdmin = require('../firebase-admin-files/index')
const gerarEmail = require('../funtions/gerarEmails')
const enviarEmail = require('../funtions/enviarEmail')
const apiIpag = require('../api/apiIpag')
const crypto = require('crypto')
const assert = require('assert')

//rotas login

router.post('/login-pessoa', async (req, res) => {
    try {
        const pessoa = await pessoaService.loginPessoa(req.body)
        if (!pessoa) {
            res.send("Login ou senha incorreta")
        } else {
            res.send(pessoa)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.post('/login-cliente', async (req, res) => {
    try {
        const cliente = await clientesService.loginCliente(req.body)
        if (!cliente) {
            res.send("Login ou senha incorreta");
        } else {
            res.send(cliente)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.get('/login-fornecedor/:email', middleware.decodeToken, async (req, res) => {
    try {
        const firebaseId = req.user.uid
        const email = req.params.email
        const fornecedor = await fornecedoresService.loginFornecedor({ firebaseId, email })
        if (!fornecedor) {
            res.send("Login ou senha incorreta")
        } else {
            res.send(fornecedor)
        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/pessoas', async (req, res) => {
    try {
        const pessoas = await pessoaService.getPessoas()
        res.json(pessoas);
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});






router.get('/getUserTypeByUid', middleware.decodeToken, async (req, res) => {
    try {
        const uid = req.user.uid
        console.log("uid: ", uid)
        const userType = await pessoaService.getUserTypeByUid(uid)
        console.log("user type: ", userType);
        res.json(userType)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getUserByUid', middleware.decodeToken, async (req, res) => {
    try {
        const uid = req.user.uid
        console.log("uid: ", uid)
        const userType = await pessoaService.getUserByUid(uid)
        console.log("user type: ", userType);
        res.json(userType)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.post('/getByEmail', async (req, res) => {
    try {
        console.log("get by email route: ", req.body)
        const result = await pessoaService.getByEmail(req.body)
        console.log(result)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.post('/checkIfEmailExists', async (req, res) => {
    try {
        console.log("get by email route: ", req.body)
        const result = await pessoaService.checkIfEmailExists(req.body)
        console.log(result)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/updateEmail/:email', middleware.decodeToken, async (req, res) => {
    try {
        const idFirebase = req.user.uid
        const email = req.params.email
        const result = await pessoaService.updateEmail(email, idFirebase);
        res.json("update e-mail");
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/updateFirebaseId/:uid/:email', async (req, res) => {
    try {
        const idFirebase = req.params.uid
        const email = req.params.email
        console.log("update firebase id: ", idFirebase)
        console.log("update firebase id: ", email)
        const result = await pessoaService.updateFirebaseId(idFirebase, email);
        res.json("update firebase id")
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
// rotas cliente
router.post('/getCpf', async (req, res) => {
    try {
        const cpf = req.body.cpf
        const cliente = await clientesService.checkIfCpfExists(cpf)
        console.log(cliente)
        let response = { error: true, message: "Já existe uma conta com este CPF", data: null }
        if (cliente.length == 0) {
            response = { error: false, message: "sucesso!", data: null }
        }
        res.json(response)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/clientes', async (req, res) => {
    try {
        const clientes = await clientesService.getClientes()
        res.json(clientes)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/getclienteAndPessoaByIdFirebase', middleware.decodeToken, async (req, res) => {
    try {
        const idFirebase = req.user.uid
        const cliente = await clientesService.getclienteAndPessoaByIdFirebase(idFirebase)
        res.json(cliente)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/clientesByFk_id/:fk_id', middleware.decodeToken, async (req, res) => {
    try {
        const fk_id = req.params.fk_id
        const clientes = await clientesService.getByFk_id(fk_id)
        res.json(clientes)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/addCliente', async (req, res) => {
    try {
        const cadastro = req.body
        console.log("obj antes do cadastro cliente: ", cadastro)
        const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, "cliente")
        console.log("result pessoa route: ", resultPessoa)
        if (!resultPessoa.error) {
            const resultCliente = await clientesService.postCliente(cadastro, resultPessoa.data.id)
            console.log("result cliente route: ", resultCliente)
            res.json(resultCliente)
        } else {
            clientesService.deleteById(resultPessoa.data.id)
            res.json(resultPessoa)

        }
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/updateCliente', async (req, res) => {
    try {
        const cadastro = req.body
        console.log(req.body)
        const resultCliente = await clientesService.updateCliente(cadastro)
        res.json({ error: false, message: "cliente cadastrado com sucesso", data: null })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/clienteByIdPessoa/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        const idFirebase = req.user.uid
        const fornecedores = await clientesService.getClienteByIdPessoa(id);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/addClienteForFornecedor', async (req, res) => {
    try {
        const cadastro = req.body

        const resultCliente = await clientesService.postCliente(cadastro, cadastro.fk_fornecedor_pessoa)
        res.json(resultCliente)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }

});
router.put('clientes/:id', async (req, res) => {

});
router.get('/deleteEverythingCliente/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        clientesService.deleteEverythingCliente(id)
        res.json({ message: "deu bom" })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});


// rotas fornecedor
router.post('/getCnpj', async (req, res) => {
    try {
        const cnpj = req.body.cnpj
        const fornecedor = await fornecedoresService.checkIfCnpjExists(cnpj)
        let response = { error: true, message: "Já existe uma conta com este CNPJ", data: null }
        if (fornecedor.length == 0) {
            response = { error: false, message: "sucesso!", data: null }
        }
        res.json(response)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/fornecedoresOffset/:offset', middleware.decodeToken, async (req, res) => {
    try {
        console.log("entrou no fornecedores offset")
        const token = req.headers.authorization
        const idCliente = req.user.uid
        const offset = req.params.offset
        console.log("offset: ", offset)
        const fornecedores = await fornecedoresService.getFornecedoresOffset(idCliente, offset)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedores', middleware.decodeToken, async (req, res) => {
    try {
        const token = req.headers.authorization
        const idCliente = req.user.uid
        console.log("id cliente get fornecedores: ", idCliente)
        const fornecedores = await fornecedoresService.getFornecedores(idCliente)
        console.log('fornecedores:', fornecedores);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresDestaque', middleware.decodeToken, async (req, res) => {
    try {
        const token = req.headers.authorization
        const idCliente = req.user.uid
        console.log("id cliente get fornecedores: ", idCliente)
        const fornecedores = await fornecedoresService.getFornecedoresDestaque(idCliente)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
// router.get('/fornecedores', async (req, res) => {
//     console.log("entrou no fornecedores offset")
//     const fornecedores = await fornecedoresService.getFornecedores()
//     res.json(fornecedores)
// });
router.get('/fornecedoresSemDistancia', async (req, res) => {
    try {
        const fornecedores = await fornecedoresService.getFornecedoresSemDistancia()
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresSemDistanciaPreCadastro', async (req, res) => {
    try {
        console.log("fornecedores sem distancia")
        const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastro()
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresSemDistanciaPreCadastroComStatus/:statusConta', async (req, res) => {
    try {
        const statusConta = req.params.statusConta
        const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComStatus(statusConta)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresSemDistanciaPreCadastroComStatusEPlano/:statusConta/:plano', async (req, res) => {
    try {
        const statusConta = req.params.statusConta
        const plano = req.params.plano
        const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComStatusEPlano(statusConta, plano)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresSemDistanciaPreCadastroComPlano/:plano', async (req, res) => {
    try {
        const plano = req.params.plano
        const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComPlano(plano)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresSemDistanciaPreCadastroComPlanoAsc/:plano', async (req, res) => {
    try {
        const plano = req.params.plano
        const fornecedores = await fornecedoresService.fornecedoresSemDistanciaPreCadastroComPlanoAsc(plano)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/getIdFornecedorByIdFirebase', middleware.decodeToken, async (req, res) => {
    try {
        console.log(req.headers.authorization)
        const idFirebase = req.user.uid
        console.log("id firebase: ", idFirebase)
        const response = await fornecedoresService.getIdFornecedorByIdFirebase(idFirebase)
        console.log("response id fornecedor:", response)
        res.json(response)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/getFornecedorByIdFirebase', middleware.decodeToken, async (req, res) => {
    try {
        const idFirebase = req.user.uid
        console.log('id firebase for the win: ', idFirebase)
        const response = await fornecedoresService.getFornecedorByIdFirebase(idFirebase)
        console.log("response id fornecedor:", response)
        res.json(response)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/getFornecedorAndPessoaByIdFirebase', middleware.decodeToken, async (req, res) => {
    try {
        const idFirebase = req.user.uid
        console.log('id firebase for the win: ', idFirebase)
        const response = await fornecedoresService.getFornecedorAndPessoaByIdFirebase(idFirebase)
        console.log("response id fornecedor:", response)
        res.json(response)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
// router.get('/getFornecedorAndPessoaByIdFirebase/:idFirebase', async (req, res) => {
//     const idFirebase = req.params.idFirebase
//     console.log('id firebase for the win: ', idFirebase)
//     const response = await fornecedoresService.getFornecedorAndPessoaByIdFirebase(idFirebase)
//     console.log("response id fornecedor:", response)
//     res.json(response)
// });
router.get('/fornecedorById/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        const fornecedores = await fornecedoresService.getFornecedorById(id)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedorByIdPessoa/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        const idFirebase = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedorByIdPessoa(id, idFirebase);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedorByIdPessoaDL/:id', async (req, res) => {
    try {
        const id = req.params.id
        const fornecedores = await fornecedoresService.getFornecedorByIdPessoaDL(id);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedorByIdPessoaSemDistancia/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        const idFirebase = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedorByIdPessoaSemDistancia(id);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySegmento/:segmento', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmento(segmento, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByCategoria/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByCategoria(categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresDestaqueByCategoria/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresDestaqueByCategoria(categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByCategoriaOffset/:categoria/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const categoria = req.params.categoria
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByCategoriaOffset(categoria, uid, offset)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/fornecedoresBySegmentoOffset/:categoria/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const categoria = req.params.categoria
        const ordem = req.params.ordem
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByCategoriaOrdemOffset(categoria, ordem, uid, offset)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
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
router.get('/fornecedoresBySubCategoria/:subCategoria/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoria(subCategoria, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaOffset/:subCategoria/:offset/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const offset = req.params.offset
        const uid = req.user.uid
        const categoria = req.params.categoria
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaOffset(subCategoria, uid, offset, categoria)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaOrdem/:subCategoria/:ordem/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const ordem = req.params.ordem;
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaOrdem(subCategoria, ordem, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoriaOrdemOffset/:subCategoria/:ordem/:offset/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const ordem = req.params.ordem;
        const offset = req.params.offset
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaOrdemOffset(subCategoria, ordem, offset, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoriaFiltro/:subCategoria/:tipoFiltro/:filtro/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const filtro = req.params.filtro;
        const tipoFiltro = req.params.tipoFiltro
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaFiltro(subCategoria, tipoFiltro, filtro, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }

});
router.get('/fornecedoresBySubCategoriaFiltroOffset/:subCategoria/:tipoFiltro/:filtro/:offset/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const filtro = req.params.filtro;
        const tipoFiltro = req.params.tipoFiltro
        const offset = req.params.offset
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaFiltroOffset(subCategoria, tipoFiltro, filtro, offset, categoria, uid)
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
router.get('/fornecedoresBySubCategoriaAndSegmentoOffset/:subCategoria/:segmento/:offset/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const offset = req.params.offset
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoOffset(subCategoria, segmento, offset, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoOrdem/:subCategoria/:segmento/:ordem/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const ordem = req.params.ordem
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoOrdem(subCategoria, segmento, ordem, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoOrdemOffset/:subCategoria/:segmento/:ordem/:offset/:categoria', /* middleware.decodeToken,*/ async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const ordem = req.params.ordem
        const offset = req.params.offset
        const categoria = req.params.categoria
        //const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoOrdemOffset(subCategoria, segmento, ordem, offset, categoria /*, uid*/)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoFiltro/:subCategoria/:segmento/:tipoFiltro/:filtro/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const tipoFiltro = req.params.tipoFiltro
        const filtro = req.params.filtro
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoFiltro(subCategoria, segmento, tipoFiltro, filtro, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySubCategoriaAndSegmentoFiltroOffset/:subCategoria/:segmento/:tipoFiltro/:filtro/:offset/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const segmento = req.params.segmento
        const tipoFiltro = req.params.tipoFiltro
        const filtro = req.params.filtro
        const offset = req.params.offset
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySubCategoriaAndSegmentoFiltroOffset(subCategoria, segmento, tipoFiltro, filtro, offset, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresDestaqueBySubCategoria/:subCategoria/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const subCategoria = req.params.subCategoria
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresDestaqueBySubCategoria(subCategoria, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySegmentoAndCategoria/:segmento/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoria(segmento, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySegmentoAndCategoriaOffset/:segmento/:categoria/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const categoria = req.params.categoria
        const offset = req.params.offset
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoriaOffset(segmento, categoria, uid, offset)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message);
    }

});
router.get('/fornecedoresDestaqueBySegmentoAndCategoria/:segmento/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresDestaqueBySegmentoAndCategoria(segmento, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/fornecedoresBySegmentoAndCategoriaAndSubCategoria/:segmento/:categoria/:subcategoria', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const categoria = req.params.categoria
        const subcategoria = req.params.subcategoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoriaAndSubCategoria(segmento, categoria, subcategoria, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByNomeAndCategoria/:nome/:categoria', middleware.decodeToken, async (req, res) => {
    try {
        const nome = req.params.nome
        const categoria = req.params.categoria
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByNomeAndCategoria(nome, categoria, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByNomeOrdem/:nome/:ordem', middleware.decodeToken, async (req, res) => {
    try {
        const nome = req.params.nome
        const ordem = req.params.ordem
        const uid = req.user.uid
        console.log("nome: ", nome)
        console.log("ordem: ", ordem)
        const fornecedores = await fornecedoresService.getFornecedoresByNomeOrdem(nome, ordem, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByNomeFiltro/:nome/:tipoFiltro/:filtro', middleware.decodeToken, async (req, res) => {
    try {
        const nome = req.params.nome
        const filtro = req.params.filtro
        const tipoFiltro = req.params.tipoFiltro
        const uid = req.user.uid
        console.log("nome: ", nome)
        console.log("filtro: ", filtro)
        console.log("tipo filtro: ", tipoFiltro)
        const fornecedores = await fornecedoresService.getFornecedoresByNomeFiltro(nome, filtro, tipoFiltro, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByFiltroOffset/:tipoFiltro/:filtro/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const filtro = req.params.filtro
        const tipoFiltro = req.params.tipoFiltro
        const offset = req.params.offset
        const uid = req.user.uid
        console.log("filtro: ", filtro)
        console.log("tipo filtro: ", tipoFiltro)
        console.log("offset: ", offset)
        const fornecedores = await fornecedoresService.getFornecedoresByFiltroOffset(filtro, tipoFiltro, offset, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/fornecedoresByFiltroCategoriaOffset/:tipoFiltro/:filtro/:categoria/:offset', middleware.decodeToken, async (req, res) => {
    try {
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
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/fornecedoresByNome/:nome', middleware.decodeToken, async (req, res) => {
    try {
        const nome = req.params.nome
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByNome(nome, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/fornecedoresByOrdem/:ordem', middleware.decodeToken, async (req, res) => {
    try {
        const ordem = req.params.ordem
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByOrdem(ordem, uid);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByOrdemOffset/:ordem/:offset', middleware.decodeToken, async (req, res) => {
    try {
        const ordem = req.params.ordem
        const offset = req.params.offset
        console.log("ordem: ", ordem)
        console.log("offset: ", offset);
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByOrdemOffset(ordem, offset, uid);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresByNomeCategoriaAndSegmento/:nome/:categoria/:segmento', middleware.decodeToken, async (req, res) => {
    try {
        const nome = req.params.nome
        const categoria = req.params.categoria
        const segmento = req.params.segmento
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresByNomeCategoriaAndSegmento(nome, categoria, segmento, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/fornecedoresBySegmentoNomeAndOrdem/:segmento/:nome/:ordem', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const nome = req.params.nome
        const ordem = req.params.ordem
        const uid = req.user.uid
        console.log("ordem: ", ordem)
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoNomesegmentoAndOrdem(nome, ordem, segmento, uid)
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/fornecedoresBySegmentoAndNome/:segmento/:nome', middleware.decodeToken, async (req, res) => {
    try {
        const segmento = req.params.segmento
        const nome = req.params.nome
        const uid = req.user.uid
        const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndNome(nome, segmento, uid);
        res.json(fornecedores)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
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
        res.status(500).send(e.message);
    }
});
router.post('/updateFornecedor', async (req, res) => {
    try {
        const cadastro = req.body
        console.log("update fornecedor: ", cadastro)
        const resultFornecedor = await fornecedoresService.updateFornecedores(cadastro);
        res.json(resultFornecedor)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }

});
router.post('/updateFornecedorCompletarContaSite', async (req, res) => {
    try {
        const cadastro = req.body
        console.log("update fornecedor: ", cadastro)
        const resultFornecedor = await fornecedoresService.updateFornecedoresSite(cadastro);
        res.json(resultFornecedor)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }

});
router.post('/updateFornecedorNebulosa', async (req, res) => {
    try {
        const cadastro = req.body
        console.log("update fornecedor: ", cadastro)
        const resultFornecedor = await fornecedoresService.updateFornecedoresNebulosa(cadastro);
        res.json(resultFornecedor)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/updateFornecedorCompletarCadastro', async (req, res) => {
    try {
        const cadastro = req.body
        console.log("cadastro update fornecedor: ", cadastro)
        const resultFornecedor = await fornecedoresService.updateFornecedorCompletarCadastro(cadastro);
        res.json({ error: false })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/updateStatusPagamentoFornecedor',  async (req, res) => {
    try {
        const { status_pagamento, fk_fornecedor_pessoa } = req.body
        //const uid = req.user.uid
       // const fornecedor = await fornecedoresService.getFornecedorByIdFirebase(uid)
        await fornecedoresService.updateStatusPagamentoFornecedor(status_pagamento, fk_fornecedor_pessoa)
        console.log("update de pagamento funcionou");
        res.json("funcionou")
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get("/getStatusPagamentoFornecedorByIdFirebase", middleware.decodeToken, async (req, res) => {
    try {
        const uid = req.user.uid
        const fornecedor = await fornecedoresService.getFornecedorByIdFirebase(uid);
        res.json(fornecedor)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.get('/fornecedoresTeste', async (req, res) => {
    try {
        const result = fornecedoresService.testeFornecedor()
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.put('fornecedores/:id', async (req, res) => {

});
router.delete('fornecedores/:id', async (req, res) => {

});
router.post('/pesquisarFornecedoresVip', async (req, res) => {
    try {
        const result = await fornecedoresService.pesquisarFornecedoresVip(req.body)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.get("/getFornecedorByEmail/:email", async (req, res) => {
    try {
        const email = req.params.email
        const fornecedor = await fornecedoresService.getFornecedorByEmail(email);
        res.json(fornecedor)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.post('/webhookPlanoEstrelarIpag', async (req, res) => {
    const cadastroIpag = req.body
   // await logsData.insertLog(JSON.stringify(cadastroIpag), 'webhook')
try {
    

    if (cadastroIpag.resource == "subscriptions") {
        // tratando status code e message
       // await logsData.insertLog(JSON.stringify(cadastroIpag))
        const statusCode = cadastroIpag.attributes.last_transaction.attributes.status.code
        const mensagemStatus = pagamentosFunctions.mensagemStatusContaIpag(statusCode)
        console.log("status ipag: ", mensagemStatus)
        const emailIpag = cadastroIpag.attributes.customer.attributes.email
        const resultEmail = await fornecedoresService.getFornecedorByEmail(emailIpag)
        const fornecedorDB = resultEmail[0]
        const resultAssinatura = await assinaturaService.getAssinaturaByIdFornecedor(fornecedorDB.pk_id)
        const assinaturaDB = resultAssinatura[0]
        console.log("resultado da assinatura: ", !assinaturaDB && statusCode == 8)
        if (!assinaturaDB && statusCode == 8) {
            const assinaturaIpag = cadastroIpag
            const assinaturaParaCriar = {
                dadosAssinatura: JSON.stringify(assinaturaIpag),
                dataPrimeiraCobranca: cadastroIpag.attributes.starting_date,
                idUnico: cadastroIpag.id,
                cardToken: cadastroIpag.attributes.last_transaction.attributes.card.token,
                fkAssinaturaFornecedor: fornecedorDB.pk_id,
                profile_id: cadastroIpag.attributes.profile_id
            }
            console.log("assinatura para criar: ", assinaturaParaCriar)
            await assinaturaService.postAssinatura(assinaturaParaCriar)
            await fornecedoresService.updateStatusPagamentoFornecedor(mensagemStatus, fornecedorDB.fk_fornecedor_pessoa)
        } else if (!!assinaturaDB && statusCode == 8) {
            const assinaturaIpag = cadastroIpag
            const assinaturaParaUpdate = {
                dadosAssinatura: JSON.stringify(assinaturaIpag),
                idAssinatura: cadastroIpag.id + "",
                dataBloqueio: null,
                cardToken: cadastroIpag.attributes.last_transaction.attributes.card.token,
            }
            await assinaturaService.updateAssinatura(assinaturaParaUpdate)
            await fornecedoresService.updateStatusPagamentoFornecedor(mensagemStatus, fornecedorDB.fk_fornecedor_pessoa)
        } else if (!!assinaturaDB && statusCode != 8) {
            const assinaturaIpag = cadastroIpag
            const assinaturaParaUpdate = {
                dadosAssinatura: JSON.stringify(assinaturaIpag),
                idAssinatura: cadastroIpag.id + "",
                idFornecedor: fornecedorDB.pk_id,
                dataBloqueio: pagamentosFunctions.gerarDataBloqueio(),
                cardToken: cadastroIpag.attributes.last_transaction.attributes.card.token,
            }
            await assinaturaService.updateAssinatura(assinaturaParaUpdate)
            await fornecedoresService.updateStatusPagamentoFornecedor(mensagemStatus, fornecedorDB.fk_fornecedor_pessoa)
        } else if (!assinaturaDB && statusCode != 8) {
            await fornecedoresService.updateStatusPagamentoFornecedor(mensagemStatus, fornecedorDB.fk_fornecedor_pessoa)
        }

        res.send(mensagemStatus)

    }
} catch (error) {
    res.status(500).json(error)
}

})


router.post('/callbackUrlIpag', async (req, res) => {
    
    try {
        const cadastroIpag = req.body
        //await logsData.insertLog(JSON.stringify(cadastroIpag), 'callback')
        if (!!cadastroIpag.retorno) {
            
            const resultEmail = await fornecedoresService.getFornecedorByEmail(cadastroIpag.retorno[0].cliente.email)
            const fornecedorDB = resultEmail[0]
            const data_bloqueioDate = null // pagamentosFunctions.checarSePrecisaDeDataBloqueio(cadastroIpag.retorno[0].mensagem_transacao)
            const cartaoIpag = { dadosCartao: JSON.stringify(cadastroIpag.retorno[0].cartao), numero: cadastroIpag.retorno[0].cartao.numero, token: cadastroIpag.retorno[0].assinatura.card_token, bandeira: cadastroIpag.retorno[0].cartao.bandeira, fkCartaoFornecedor: fornecedorDB?.pk_id }
            const assinaturaIpag = { dadosAssinatura: JSON.stringify(cadastroIpag.retorno[0].assinatura), dataPrimeiraCobranca: new Date(), idUnico: cadastroIpag.retorno[0].assinatura.id + "", cardToken: cadastroIpag.retorno[0].assinatura.card_token, fkAssinaturaFornecedor: fornecedorDB?.pk_id, dataBloqueio: data_bloqueioDate }
            if (resultEmail.length == 0) {
                try {
                    const cadastro = ipagFunctions.tratarDadosDoFornecedor(cadastroIpag.retorno[0].cliente)
                    cadastro.statusPagamento = ipagFunctions.mensagemStatusContaIpag(cadastroIpag.retorno[0].status_pagamento)
                    const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, /*cadastro.firebaseId,*/ "fornecedor")
                    const resultFornecedor = await fornecedoresService.postFornecedores(cadastro, resultPessoa.data.id);
                    //res.status(200).json(resultFornecedor.data)
                    cartaoIpag.fkCartaoFornecedor = resultFornecedor.data.pk_id
                    assinaturaIpag.fkAssinaturaFornecedor = resultFornecedor.data.pk_id
                    await assinaturaService.postAssinatura(assinaturaIpag)
                    await pagamentoService.postCartao(cartaoIpag)
                    res.status(200).json("fornecedor cadastrado com sucesso!")
                } catch (error) {
                    throw ("erro no cadastro de fornecedor: " + error.message)
                }

            } else if (resultEmail.length == 1) {
                
                if (fornecedorDB.cpf && (fornecedorDB.cpf == cadastroIpag.retorno[0].cliente.cpf_cnpj || fornecedorDB.cnpj == cadastroIpag.retorno[0].cliente.cpf_cnpj)) {
                    if (cadastroIpag.retorno[0].status_pagamento == 8 || cadastroIpag.retorno[0].status_pagamento == 5) {
                        // update do status
                        console.log("webhook entrando no if que faz update no pagamento do fornecedor")
                        try {
                            await fornecedoresService.updateStatusPagamentoFornecedor(ipagFunctions.mensagemStatusContaIpag(cadastroIpag.retorno[0].status_pagamento), fornecedorDB.fk_fornecedor_pessoa)
                            const assinatura = await assinaturaService.getAssinaturaByIdFornecedor(fornecedorDB.pk_id).catch((e) => { throw ("erro get assinatura fornecedor: " + e) })
                            const cartao = await pagamentoService.getCartaoByNumeroAndIdFornecedor(cartaoIpag.numero, fornecedorDB.pk_id).catch((e) => { throw ("erro get cartao fornecedor: " + e) })
                            console.log("cartao ta no db: ", cartao)
                            if (!!assinatura) {
                                await assinaturaService.updateAssinatura(assinaturaIpag).catch((e) => { throw ("erro no update assinatura: " + e) })
                            } else {
                                await assinaturaService.postAssinatura(assinaturaIpag).catch((e) => { throw ("erro no post assinatura: " + e) })
                            }
                            if (cartao.length == 0) {
                                await pagamentoService.postCartao(cartaoIpag).catch((e) => { throw ("erro no post cartao: " + e) })
                            }
                            res.status(200).json("Fornecedor atualizado com sucesso!")
                        } catch (error) {
                            res.status(500).json(error)
                        }
                    } else {
                        // res.send("o status é cancelado:")
                        res.status(500).json({ message: "status não é aprovado nem capturado", status_pagamento: cadastroIpag.retorno[0].status_pagamento })
                        console.log("callback entrando no else do status não aprovado")
                    }

                } else {
                    console.log("cpf ou cnpj vindo do ipag: " + cadastroIpag.retorno[0].cliente.cpf_cnpj)
                    res.json({ cpf_cnpj: cadastroIpag.retorno[0].cliente.cpf_cnpj, cpf: fornecedorDB.cpf, condicional: fornecedorDB.cpf && (fornecedorDB.cpf == cadastroIpag.retorno[0].cliente.cpf_cnpj || fornecedorDB.cnpj == cadastroIpag.retorno[0].cliente.cpf_cnpj) })
                    console.log("webhook entrando no else onde o cpf ou cnpj não é igual ao do banco de dados")
                    //res.send( "erro: Existe uma conta com este email, mas os dados não estão coincidindo. Cheque os dados de sua conta no app festum")
                }

            } else {
                res.status(500).json({ message: "mais de um email encontrado" })
            }
        } else {
            const textToEncript = cadastroIpag.status_pagamento + ""
            const encrypted = 'JHCgjsdbdjb03JdAo'+textToEncript+'Hgahk2jsdh234fkj52Ga87d5f'
            var finalText = encrypted
            res.redirect('https://festum-site.vercel.app/form-precadastro-firebase' + "?code=" + finalText )
        }


    } catch (e) {
        console.log("erro no pagamento ipag callback: ", e)
        res.json(e)
    }

})

//rotas produto
router.get('/produtos', async (req, res) => {
    try {
        const produtos = await produtosService.getProdutos();
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});

router.get('/produtos/:id', async (req, res) => {
    try {
        const id = req.params.id
        const produto = await produtosService.getProdutoById(id)
        console.log(produto)
        res.json(produto)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/getProdutosFromIdFornecedor/:idFornecedor', middleware.decodeToken, async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const produtos = await produtosService.getProdutosFromIdFornecedor(idFornecedor)
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getProdutosFromIdFornecedorSite/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const produtos = await produtosService.getProdutosFromIdFornecedor(idFornecedor)
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getProdutosFromIdFornecedorProdutos/:idFornecedor', middleware.decodeToken, async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const produtos = await produtosService.getProdutosFromIdFornecedorProdutos(idFornecedor)
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getProdutosFromIdFornecedorCombos/:idFornecedor', middleware.decodeToken, async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const produtos = await produtosService.getProdutosFromIdFornecedorCombos(idFornecedor)
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.get('/getProdutosFromIdFornecedorProdutosDL/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const produtos = await produtosService.getProdutosFromIdFornecedorProdutos(idFornecedor)
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getProdutosFromIdFornecedorCombosDL/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const produtos = await produtosService.getProdutosFromIdFornecedorCombos(idFornecedor)
        res.json(produtos)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

router.post('/addProduto', middleware.decodeToken, async (req, res) => {
    const produto = req.body
    try {
        await produtosService.postProduto(produto)
        res.json({ error: false, message: "Produto cadastrado com sucesso", data: null })
    } catch (e) {
        console.log("erro ao adicionar produto: ", e.mensagem)
        res.status(500).send(e.message)
    }


});
router.post('/addProdutoSite', async (req, res) => {
    const produto = req.body
    console.log("adicionar produto", produto)
    try {
        await produtosService.postProduto(produto)
        res.json({ error: false, message: "Produto cadastrado com sucesso", data: null })
    } catch (e) {
        console.log("erro ao adicionar produto: ", e.message)
        res.status(500).send(e.message)
    }


});
router.get('/deletarProduto/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        await produtosService.deleteProduto(id)
        res.json({ error: false, message: "Produto excluído com sucesso", data: null })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.get('/deletarProdutoSite/:id', async (req, res) => {
    try {
        const id = req.params.id
        await produtosService.deleteProduto(id)
        res.json({ error: false, message: "Produto excluído com sucesso", data: null })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/updateProduto', middleware.decodeToken, async (req, res) => {
    try {
        const produto = req.body
        const newProduto = await produtosService.updateProduto(produto)
        res.json({ error: false, message: "Produto editado com sucesso", data: newProduto })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.post('/updateProdutoSite', async (req, res) => {
    try {
        const produto = req.body
        const newProduto = await produtosService.updateProduto(produto)
        res.json({ error: false, message: "Produto editado com sucesso", data: newProduto })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
});
router.put('produtos/:id', async (req, res) => {

});
router.delete('produtos/:id', async (req, res) => {

});

router.post('/pesquisarProdutos', async (req, res) => {
    try {
        const result = await produtosService.pesquisarProdutos(req.body)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get("/deleteEverythingFornecedor/:id/:idPessoa", middleware.decodeToken, (req, res) => {
    try {
        const id = req.params.id
        const idPessoa = req.params.idPessoa
        fornecedoresService.deleteEverythingFornecedor(id, idPessoa)
        console.log("deu bom")
        res.json({ message: "deu bom" })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get("/deleteEverythingFornecedorSite/:id/:idPessoa", async (req, res) => {
    try {
        const id = req.params.id
        const idPessoa = req.params.idPessoa
        console.log("id fornecedor:", id)
        console.log("id pessoa: ", idPessoa)
        await fornecedoresService.deleteEverythingFornecedor(id, idPessoa)
        console.log("deu bom")
        res.json({ message: "deu bom" })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

// rotas anuncio
router.post('/addAnuncio', middleware.decodeToken, async (req, res) => {
    try {
        const anuncio = req.body
        console.log("dados anuncio:", anuncio)
        await anuncioService.postAnuncio(anuncio)
        res.json({ error: false, message: "anuncio criado com sucesso", data: null })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.post('/updateAnuncio', middleware.decodeToken, async (req, res) => {
    try {
        const anuncio = req.body
        await anuncioService.updateAnuncio(anuncio)
        res.json({ error: false, message: "anuncio criado com sucesso", data: null })
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getAnuncioTipo/:tipo', middleware.decodeToken, async (req, res) => {
    try {
        const tipoAnuncio = req.params.tipo
        const result = await anuncioService.getAnuncioTipo(tipoAnuncio)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getAnuncioByIdFornecedor/:id', middleware.decodeToken, async (req, res) => {
    try {
        const id = req.params.id
        const result = await anuncioService.getAnuncioByIdFornecedor(id)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getAnuncioFromId/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await anuncioService.getAnuncioFromId(id)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/deleteAnuncioById/:id', async (req, res) => {
    try {
        const id = req.params.id
        const result = await anuncioService.deleteAnuncioById(id)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})




// extra data
router.get('/segmentos', async (req, res) => {
    try {
        const result = await categoriaService.getSegmentos()
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/categorias', async (req, res) => {
    try {
        const result = await categoriaService.getCategorias()
        res.json(result);
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/subcategorias', async (req, res) => {
    try {
        const result = await categoriaService.getSubcategorias();
        const resultTratado = categoriasFunctions.criarStringObjetoImagensSubcategorias(result)
        console.log("restultado tratado: ", resultTratado)
        // res.json(result)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/subcategoriasByFkId/:fk_id', async (req, res) => {
    try {
        // subcategorias by fk_id categorias
        let ids = req.params.fk_id
        ids = JSON.parse(ids)

        const result = await categoriaService.getSubcategoriaByFkId(ids)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/subcategoriasByFkIdCategoria/:fk_id', async (req, res) => {
    try {
        // subcategorias by fk_id categorias
        let id = req.params.fk_id
        const result = await categoriaService.getSubcategoriaByFkIdCategoria(id)
        res.json(result)
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/cidades', middleware.decodeToken, async (req, res) => {
    try {
        const result = await categoriaService.getCidades()
        res.json(result);
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})

// cartao
router.post('/cadastrarCartao', async (req, res) => {
    try {
        const cartao = req.body
        console.log("cartao: ", cartao)
        const result = await pagamentoService.postCartao(cartao)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})
router.get('/listarCartoesByIdFornecedor/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        console.log("idFornecedor: ", idFornecedor)
        const result = await pagamentoService.listarCartoesByIdFornecedor(idFornecedor)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/getCartaoByNumeroAndIdFornecedor/:numero/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const numero = req.params.numero
        console.log("idFornecedor: ", idFornecedor)
        console.log("numero: ", numero)
        const result = await pagamentoService.getCartaoByNumeroAndIdFornecedor(numero, idFornecedor)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// assinatura
router.post('/cadastrarAssinatura', async (req, res) => {
    try {
        const assinatura = req.body
        console.log("assinatura: ", assinatura)
        const result = await assinaturaService.postAssinatura(assinatura)
        res.status(200).json(result);
    } catch (error) {
        console.log("error: ", error.message)
        res.status(500).send(error.message)
    }

})

router.post('/updateAssinatura', async (req, res) => {
    try {
        const assinatura = req.body
        console.log("assinatura: ", assinatura)
        const result = await assinaturaService.updateAssinatura(assinatura);
        res.status(200).json(result);
    } catch (error) {
        console.log("error: ", error.message)
        res.status(500).send(error.message)
    }

})


router.get('/getAssinaturaByIdFornecedor/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        console.log("idFornecedor: ", idFornecedor)
        const result = await assinaturaService.getAssinaturaByIdFornecedor(idFornecedor)
        res.status(200).json(result);
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/getAssinaturaByIdFornecedorDL/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        console.log("idFornecedor: ", idFornecedor)
        const result = await assinaturaService.getAssinaturaByIdFornecedor(idFornecedor)
        res.status(200).json(result);
    } catch (error) {
        console.error(error)
        res.status(500).send(error.message)
    }
})
router.get('/deleteAssinaturaByIdUnico/:idUnico', async (req, res) => {
    try {
        const idUnico = req.params.idUnico
        console.log("idUnico: ", idUnico)
        const result = await assinaturaService.deleteAssinaturaByIdUnico(idUnico)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/cancelarAssinaturaByIdUnico/:idUnico', async (req, res) => {
    try {
        const idUnico = req.params.idUnico
        console.log("idUnico: ", idUnico)
        const result = await assinaturaService.cancelarAssinaturaByIdUnico(idUnico)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

router.get('/reativarAssinaturaByIdUnico/:idUnico', async (req, res) => {
    try {
        const idUnico = req.params.idUnico
        console.log("idUnico: ", idUnico)
        const result = await assinaturaService.reativarAssinaturaByIdUnico(idUnico)
        res.status(200).json(result);
    } catch (error) {
        res.status(500).send(error.message)
    }
})

// cupom de desconto

router.get('/getCupom/:idFornecedor', middleware.decodeToken, async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const result = await cupomService.getCupom(idFornecedor)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})
router.get('/getCupomDL/:idFornecedor', async (req, res) => {
    try {
        const idFornecedor = req.params.idFornecedor
        const result = await cupomService.getCupom(idFornecedor)
        res.status(200).json(result)
    } catch (error) {
        res.status(500).send(error)
    }
})

// router.get('/testesIpag', async (req, res) => {
//     try {
//         console.log("pegar transacao")
//         const idAssinatura = req.params.idAssinatura
//         // const api = axios.create({
//         //     baseURL: 'https://sandbox.ipag.com.br',
//         //     timeout: 6000,
//         //     auth: {
//         //         username: "jg.7651@gmail.com",
//         //         password: "426B-10A599EA-0BD38435-FF3843BD-05BE"
//         //     },
//         //     headers: {
//         //         "Content-Type": "application/json",
//         //         "x-api-version": 2
//         //     }
//         // }) 
//         const api = axios.create({
//             baseURL: 'https://api.ipag.com.br',
//             timeout: 3000,
//             auth: {
//                 username: "festumbrasil@gmail.com",
//                 password: "F043-B605F28B-77B89EF6-91CDC155-6012"
//             },
//             headers: {
//                 "Content-Type": "application/json",
//                 "x-api-version": 2
//             }
//         })
//         // const resultSubscriptionIpag = await api.request({
//         //     url: "/service/resources/webhooks?id="+idAssinatura,
//         //     method: "DELETE"
//         // })
//         const resultSubscriptionIpag = await api.request({
//             url: "/service/resources/webhooks",
//             method: "GET"
//         })
//         // const resultSubscriptionIpag = await api.request({
//         //     url: "/service/resources/webhooks",
//         //     method: "POST",
//         //     data: {
//         //         "http_method": "POST",
//         //         "url": "https://festum-heroku-production.up.railway.app/webhookPlanoEstrelarIpag",
//         //         "description": "Webhook para receber atualizações automáticas de assinatura",
//         //         "actions": [
//         //             "SubscriptionPaymentSucceeded",
//         //             "SubscriptionPaymentFailed",
//         //         ]
//         //     }
//         // })
//         res.json(resultSubscriptionIpag.data, null, 2)
//     } catch (error) {
//         res.status(500).send(error.message)
//     }
// })

router.get('/sendEmailVerification/:email', async (req, res) => {
    try {
        const emailFornecedor = req.params.email;
        const link = await firebaseAdmin.admin.auth().generateEmailVerificationLink(emailFornecedor, {
            url: "https://festum-site.vercel.app/email-confirmado-app"
        })
        const url = new URL(link)
        url.searchParams.set('lang', 'pt-br')
        const emailHtml = gerarEmail.gerarEmailEndereco(url.toString())
        enviarEmail.normalNoReply(emailFornecedor, "Verifição de email Festum", emailHtml)
        res.status(200).send('email enviado com sucesso!')
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})
router.get('/sendEmailVerificationSite/:email', async (req, res) => {
    try {
        const emailFornecedor = req.params.email
        const link = await firebaseAdmin.admin.auth().generateEmailVerificationLink(emailFornecedor, {
            url: "https://festum-site.vercel.app/email-confirmado"
        })
        const url = new URL(link)
        url.searchParams.set('lang', 'pt-br')
        const emailHtml = gerarEmail.gerarEmailEndereco(url.toString())
        enviarEmail.normalNoReply(emailFornecedor, "Verifição de email Festum", emailHtml)
        res.status(200).send('email enviado com sucesso!')
    } catch (error) {
        console.log(error)
        res.status(500)
    }
})

router.get('/sendPasswordResetEmail/:email', async (req, res) => {
    try {
        const emailFornecedor = req.params.email
        const link = await firebaseAdmin.admin.auth().generatePasswordResetLink(emailFornecedor, {
            url: "https://festum-site.vercel.app/senha-confirmada-app"
        })
        const url = new URL(link)
        url.searchParams.set('lang', 'pt-br')
        const emailHtml = gerarEmail.gerarEmailRedefinicaoDeSenha(url.toString())
        enviarEmail.normalNoReply(emailFornecedor, "Redefinição de senha Festum", emailHtml)
        res.status(200).send('email enviado com sucesso!')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
})

router.post("/orcamentoEmailSend", async (req, res) => {
    try {
        const { nome, emailCliente, telefone, mensagem, emailFornecedor } = req.body
        const emailHtml = gerarEmail.gerarEmailOrcamento(nome, emailCliente, telefone, mensagem)
        enviarEmail.orcamento(emailHtml, emailCliente, emailFornecedor)
        res.status(200).send('email enviado com sucesso!')
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }

})
router.post("/appleInAppPurchase", async (req, res) => {
    try {
        const body = req.body
        await logsData.insertLog(JSON.stringify(body), 'apple webhook')
        res.end()
    }catch(error){
        console.log(error)
    }
})
    








module.exports = router