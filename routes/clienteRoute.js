const express = require('express');
const clientesService = require('../service/clientesService')
const produtosService = require('../service/produtosService')
const fornecedoresService = require('../service/fornecedoresService')
const pessoaService = require('../service/pessoaService')
const anuncioService = require('../service/anuncioService')
const fornecedoresFunctions = require('../funtions/fornecedoresFunctions')
const categoriaService = require('../service/categoriasService')
const router = express.Router()
const _ = require('lodash');
const middleware = require('../middleware');
const axios = require("axios")


//rotas login

router.post('/login-pessoa', async (req,res) => {
    
    const pessoa = await pessoaService.loginPessoa(req.body)
    if(!pessoa){
        res.send("Login ou senha incorreta")
    }else{
        res.send(pessoa)
    }   
})
router.post('/login-cliente', async (req,res) => {

        const cliente = await clientesService.loginCliente(req.body)
        if(!cliente){
            res.send("Login ou senha incorreta")
        }else{
            res.send(cliente)
        }   
})

router.get('/login-fornecedor/:email',middleware.decodeToken, async (req, res)=>{
    const firebaseId = req.user.uid
    const email = req.params.email
    const fornecedor = await fornecedoresService.loginFornecedor({firebaseId, email})
    if(!fornecedor){
        res.send("Login ou senha incorreta")
    }else{
        res.send(fornecedor)
    }
})
router.get('/pessoas', async (req,res) => {
    const pessoas = await pessoaService.getPessoas()
    res.json(pessoas);
});
router.get('/teste', async (req,res) => {
    console.log("ipag foi!!!!")
    const api = axios.default.create({
        baseURL:'https://sandbox.ipag.com.br',
        timeout: 3000,
        auth:{
            username: "jg.7651@gmail.com",
            password: "FADB-5B8823C1-4675A774-45776E48-4FAD"
        },
        headers:{
            "Content-Type": "application/json",
            "x-api-version": 2
        }
    })
    
});
router.get('/teste', async (req,res) => {
    
    res.json("teste 2");
});
router.get('/getUserTypeByUid',middleware.decodeToken,  async ( req, res) => {
    const uid = req.user.uid
    console.log("uid: ", uid)
    const userType = await pessoaService.getUserTypeByUid(uid)
    console.log("user type: ", userType);
    res.json(userType)
})

router.post('/getByEmail', async (req,res) => {
    console.log("get by email route: ", req.body)
    const result = await pessoaService.getByEmail(req.body)
    console.log(result)
    res.json(result)
})
router.post('/checkIfEmailExists', async (req,res) => {
    console.log("get by email route: ", req.body)
    const result = await pessoaService.checkIfEmailExists(req.body)
    console.log(result)
    res.json(result)
});

router.get('/updateEmail/:email',middleware.decodeToken, async (req, res) =>{
    const idFirebase = req.user.uid
    const email = req.params.email
    const result = await pessoaService.updateEmail(email, idFirebase);
    res.json("update e-mail")
})
router.get('/updateFirebaseId/:uid/:email', async (req, res) =>{
    const idFirebase = req.params.uid
    const email = req.params.email
    const result = await pessoaService.updateFirebaseId( idFirebase, email);
    res.json("update firebase id")
})
// rotas cliente
router.post('/getCpf', async (req,res) => {
    const cpf = req.body.cpf
    const cliente = await clientesService.checkIfCpfExists(cpf)
    console.log(cliente)
    let response = {error: true, message: "Já existe uma conta com este CPF", data: null}
    if(cliente.length == 0){
        response = {error: false, message: "sucesso!", data: null}
    }
    res.json(response)
});

router.get('/clientes', async (req,res) => {
    const clientes = await clientesService.getClientes()
    res.json(clientes)
});
router.get('/clientesByFk_id/:fk_id', middleware.decodeToken, async (req,res) => {
    const fk_id = req.params.fk_id
    const clientes = await clientesService.getByFk_id(fk_id)
    res.json(clientes)
});
router.post('/addCliente', async (req,res) => {
    const cadastro = req.body
    console.log("add cliente route: ",req.body)
    const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, cadastro.firebaseId, "cliente")
    console.log(resultPessoa);
    if(!resultPessoa.error){
        const resultCliente = await clientesService.postCliente(cadastro, resultPessoa.data.id)
        res.json(resultCliente)
    }else{
        clientesService.deleteById(resultPessoa.data.id)
        res.json(resultPessoa)
        
    }
});
router.post('/addClienteForFornecedor', async (req,res) => {
    const cadastro = req.body
   
        const resultCliente = await clientesService.postCliente(cadastro, cadastro.fk_fornecedor_pessoa)
        res.json(resultCliente)
        
   
});
router.put('clientes/:id', async (req,res) => {

});
router.get('/deleteEverythingCliente/:id',middleware.decodeToken, async (req,res) => {
    const id = req.params.id
    clientesService.deleteEverythingCliente(id)
    res.json({message: "deu bom"})
});


// rotas fornecedor
router.post('/getCnpj', async (req,res) => {
    const cnpj = req.body.cnpj
    const fornecedor = await fornecedoresService.checkIfCnpjExists(cnpj)
    let response = {error: true, message: "Já existe uma conta com este CNPJ", data: null}
    if(fornecedor.length == 0){
        response = {error: false, message: "sucesso!", data: null}
    }
    res.json(response)
});

router.get('/fornecedores/:offset',middleware.decodeToken, async (req,res) => {
    
    const token = req.headers.authorization
    const idCliente = req.user.uid
    const offset = req.params.offset
    console.log("offset: ", offset)
    const fornecedores = await fornecedoresService.getFornecedores(idCliente, offset)
    res.json(fornecedores)
});
router.get('/fornecedores', async (req,res) => {
    const fornecedores = await fornecedoresService.getFornecedores()
    res.json(fornecedores)
});
router.get('/fornecedoresSemDistancia', async (req,res) => {
    const fornecedores = await fornecedoresService.getFornecedoresSemDistancia()
    res.json(fornecedores)
});
router.get('/getIdFornecedorByIdFirebase',middleware.decodeToken, async (req,res) => {
    console.log(req.headers.authorization)
    const idFirebase = req.user.uid
    console.log("id firebase: ",idFirebase)
   const response = await fornecedoresService.getIdFornecedorByIdFirebase(idFirebase)
   console.log("response id fornecedor:", response)
   res.json(response)
});
router.get('/getFornecedorByIdFirebase',middleware.decodeToken, async (req,res) => {
    const idFirebase = req.user.uid
    console.log('id firebase for the win: ', idFirebase)
   const response = await fornecedoresService.getFornecedorByIdFirebase(idFirebase)
   console.log("response id fornecedor:", response)
   res.json(response)
});

router.get('/fornecedorById/:id', async (req,res) => {
    const id = req.params.id
    const fornecedores = await fornecedoresService.getFornecedorById(id)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmento/:segmento',middleware.decodeToken, async (req,res) => {
    const segmento = req.params.segmento
    const fornecedores = await fornecedoresService.getFornecedoresBySegmento(segmento)
    res.json(fornecedores)
});
router.get('/fornecedoresByCategoria/:categoria', async (req,res) => {
    const categoria = req.params.categoria
    const fornecedores = await fornecedoresService.getFornecedoresByCategoria(categoria)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmentoAndCategoria/:segmento/:categoria', async (req,res) => {
    const segmento = req.params.segmento
    const categoria = req.params.categoria
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndCategoria(segmento, categoria)
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeAndCategoria/:nome/:categoria', async (req,res) => {
    const nome = req.params.nome
    const categoria = req.params.categoria
    const fornecedores = await fornecedoresService.getFornecedoresByNomeAndCategoria(nome, categoria)
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeOrdem/:nome/:ordem',middleware.decodeToken, async (req,res) => {
    const nome = req.params.nome
    const ordem = req.params.ordem
    const uid = req.user.uid
    console.log("nome: ", nome)
    console.log("ordem: ", ordem)
    const fornecedores = await fornecedoresService.getFornecedoresByNomeOrdem(nome, ordem, uid) 
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeFiltro/:nome/:tipoFiltro/:filtro',middleware.decodeToken, async (req,res) => {
    const nome = req.params.nome
    const filtro = req.params.filtro
    const tipoFiltro = req.params.tipoFiltro
    // const uid = req.user.uid
    console.log("nome: ", nome)
    console.log("filtro: ", filtro)
    console.log("tipo filtro: ", tipoFiltro)
    const fornecedores = await fornecedoresService.getFornecedoresByNomeFiltro(nome, filtro, tipoFiltro) 
    res.json(fornecedores)
});

router.get('/fornecedoresByNome/:nome',middleware.decodeToken, async (req,res) => {
    const nome = req.params.nome
    const fornecedores = await fornecedoresService.getFornecedoresByNome(nome) 
    res.json(fornecedores)
});

router.get('/fornecedoresByOrdem/:ordem', async (req,res) => {
    const ordem = req.params.ordem
    const fornecedores = await fornecedoresService.getFornecedoresByOrdem(ordem) ;
    res.json(fornecedores)
});
router.get('/fornecedoresByNomeCategoriaAndSegmento/:nome/:categoria/:segmento', async (req,res) => {
    const nome = req.params.nome
    const categoria = req.params.categoria
    const segmento = req.params.segmento
    const fornecedores = await fornecedoresService.getFornecedoresByNomeCategoriaAndSegmento(nome, categoria, segmento)
    res.json(fornecedores)
});
router.get('/fornecedoresBySegmentoNomeAndOrdem/:segmento/:nome/:ordem', async (req,res) => {
    const segmento = req.params.segmento
    const nome = req.params.nome
    const ordem = req.params.ordem
    console.log("ordem: ", ordem)
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoNomeAndOrdem(nome, ordem, segmento) 
    res.json(fornecedores)
});

router.get('/fornecedoresBySegmentoAndNome/:segmento/:nome', async (req,res) => {
    const segmento = req.params.segmento
    const nome = req.params.nome
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndNome(nome, segmento) ;
    res.json(fornecedores)
});

router.get('/fornecedoresBySegmentoAndOrdem/:segmento/:ordem', async (req,res) => {
    const segmento = req.params.segmento
    const ordem = req.params.ordem
    const fornecedores = await fornecedoresService.getFornecedoresBySegmentoAndOrdem(ordem, segmento) 
    res.json(fornecedores)
});
router.get('/fornecedores-vip', async (req,res) => {
    const fornecedores = await fornecedoresService.getFornecedoresVip()
    console.log(fornecedores);
    res.json(fornecedores)
});
// router.get('/fornecedores/:id', async (req,res) => {
//     const id = req.params.id
//     const fornecedor = await fornecedoresService.getFornecedorById(id)
    
//     res.json(fornecedor)
// });
router.post('/addFornecedor', async (req,res) => {
    const cadastro = req.body
    console.log("cadastro fornecedor: ", cadastro)
    const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, /*cadastro.firebaseId,*/ "fornecedor")
    if(!resultPessoa.error){
        const resultFornecedor = await fornecedoresService.postFornecedores(cadastro, resultPessoa.data.id);
        console.log("sucesso no cadastro do fornecedor")
        res.json(resultFornecedor)
    }else{
        console.log("fornecedor não foi cadastrado")
        res.json(resultPessoa);
    }
});
router.get('/fornecedoresTeste', async (req,res) => {
    const result = fornecedoresService.testeFornecedor()
    res.json(result)
});
router.put('fornecedores/:id', async (req,res) => {

});
router.delete('fornecedores/:id', async (req,res) => {

});
router.post('/pesquisarFornecedoresVip', async (req,res) => {
    const result = await fornecedoresService.pesquisarFornecedoresVip(req.body)
    res.json(result)
})

//rotas produto
router.get('/produtos', async (req,res) => {
    const produtos = await produtosService.getProdutos();
    res.json(produtos)
});

router.get('/produtos/:id', async (req,res) => {
    const id = req.params.id
    const produto = await produtosService.getProdutoById(id)
    console.log(produto)
    res.json(produto)
});
router.get('/getProdutosFromIdFornecedor/:idFornecedor',middleware.decodeToken, async (req,res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedor(idFornecedor)
    res.json(produtos)
})
router.get('/getProdutosFromIdFornecedorProdutos/:idFornecedor',middleware.decodeToken, async (req,res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedorProdutos(idFornecedor)
    res.json(produtos)
})
router.get('/getProdutosFromIdFornecedorCombos/:idFornecedor',middleware.decodeToken, async (req,res) => {
    const idFornecedor = req.params.idFornecedor
    const produtos = await produtosService.getProdutosFromIdFornecedorCombos(idFornecedor)
    res.json(produtos)
})
router.post('/addProduto',middleware.decodeToken, async (req,res) => {
    const produto = req.body
    await produtosService.postProduto(produto)
    res.json({error: false, message: "Produto cadastrado com sucesso", data: null})
});
router.get('/deletarProduto/:id', middleware.decodeToken, async (req,res) => {
    const id = req.params.id
    await produtosService.deleteProduto(id) 
    res.json({error: false, message: "Produto excluído com sucesso", data: null})
});
router.post('/updateProduto', middleware.decodeToken, async (req,res) => {
    const produto = req.body
    const newProduto = await produtosService.updateProduto(produto)
    res.json({error: false, message: "Produto editado com sucesso", data: newProduto})
});
router.put('produtos/:id', async (req,res) => {

});
router.delete('produtos/:id', async (req,res) => {

});

router.post('/pesquisarProdutos', async (req,res) => {
    const result = await produtosService.pesquisarProdutos(req.body)
    res.json(result)
})
router.get("/deleteEverythingFornecedor/:id/:idPessoa",middleware.decodeToken, (req, res) => {
    const id = req.params.id
    const idPessoa = req.params.idPessoa
    fornecedoresService.deleteEverythingFornecedor(id,idPessoa)
    res.json({message: "deu bom"})
})

// rotas anuncio
router.post('/addAnuncio',middleware.decodeToken, async (req,res) => {
    const anuncio = req.body
    await anuncioService.postAnuncio(anuncio)
    res.json({error: false, message: "anuncio criado com sucesso", data: null})
})
router.get('/getAnuncioTipo/:tipo',middleware.decodeToken, async (req,res) => {
    const tipoAnuncio = req.params.tipo
    const result = await anuncioService.getAnuncioTipo(tipoAnuncio)
    res.json(result)
})
router.get('/getAnuncioFromId/:id', async (req,res) => {
    const id = req.params.id
    const result = await anuncioService.getAnuncioFromId(id)
    res.json(result)
})



// extra data
router.get('/segmentos', async (req,res) => {
    const result = await categoriaService.getSegmentos()
    res.json(result)
})
router.get('/categorias', async (req,res) => {
    const result = await categoriaService.getCategorias()
    res.json(result);
})
router.get('/subcategorias', async (req,res) => {
    const result = await categoriaService.getSubcategorias();
    res.json(result)
})
router.get('/subcategoriasByFkId/:fk_id', async (req,res) => {
    // subcategorias by fk_id categorias
    let ids = req.params.fk_id
    ids = JSON.parse(ids)
    
    const result = await categoriaService.getSubcategoriaByFkId(ids)
    res.json(result)
})
router.get('/cidades',middleware.decodeToken, async (req,res) => {
    const result = await categoriaService.getCidades()
    res.json(result)
})
 

module.exports = router