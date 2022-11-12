const express = require('express');
const clientesService = require('../service/clientesService')
const produtosService = require('../service/produtosService')
const fornecedoresService = require('../service/fornecedoresService')
const pessoaService = require('../service/pessoaService')
const router = express.Router()
const _ = require('lodash')



//rotas login
router.post('/login-cliente', async (req,res) => {
    
        const cliente = await clientesService.loginCliente(req.body)
        if(!cliente){
            res.send("Login ou senha incorreta")
        }else{
            res.send(cliente)
        }   
})

router.post('/login-fornecedor', async (req, res)=>{
    const fornecedor = await fornecedoresService.loginFornecedor(req.body)
    if(!fornecedor){
        res.send("Login ou senha incorreta")
    }else{
        res.send(fornecedor)
    }
})


// rotas cliente
router.get('/clientes', async (req,res) => {
    const clientes = await clientesService.getClientes()
    res.json(clientes)
});
router.get('/clientes/:id', async (req,res) => {

});
router.post('/addCliente', async (req,res) => {
    const cadastro = req.body
    const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.sobrenome, cadastro.email, cadastro.senha, "cliente")
    console.log(resultPessoa);
    if(!resultPessoa.error){
        const resultCliente = clientesService.postCliente(cadastro, resultPessoa.data.id)
        res.json(resultCliente)
    }else{
        clientesService.deleteById(resultPessoa.data.id)
        res.json(resultPessoa)
        
    }
});
router.put('clientes/:id', async (req,res) => {

});
router.delete('clietes/:id', async (req,res) => {

});


//rotas produto
router.get('/produtos', async (req,res) => {
    const produtos = await produtosService.getProdutos()
    res.json(produtos)
});
router.get('/produtos/:id', async (req,res) => {
    const id = req.params.id
    const produto = await produtosService.getProdutoById(id)
    console.log(produto)
    res.json(produto)
});
router.post('/produtos', async (req,res) => {
    console.log(req.body);
    produtosService.postProduto(req.body)
});
router.put('produtos/:id', async (req,res) => {

});
router.delete('produtos/:id', async (req,res) => {

});

router.post('/pesquisarProdutos', async (req,res) => {
    const result = await produtosService.pesquisarProdutos(req.body)
    res.json(result)
})

// rotas fornecedor

router.get('/fornecedores', async (req,res) => {
    const fornecedores = await fornecedoresService.getFornecedores()
    res.json(fornecedores)
});
router.get('/fornecedores-vip', async (req,res) => {
    const fornecedores = await fornecedoresService.getFornecedoresVip()
    console.log(fornecedores);
    res.json(fornecedores)
});
router.get('/fornecedores/:id', async (req,res) => {
    const id = req.params.id
    const fornecedor = await fornecedoresService.getFornecedorById(id)
    
    res.json(fornecedor)
});
router.post('/addFornecedor', async (req,res) => {
    const cadastro = req.body
    const resultPessoa = await pessoaService.postPessoa(cadastro.nome, cadastro.email, cadastro.senha, "fornecedor")
    if(!resultPessoa.error){
        const resultFornecedor = fornecedoresService.postFornecedores(cadastro, resultPessoa.data.id)
        res.json(resultFornecedor)
    }else{
        res.json(resultPessoa)
    }
});
router.put('fornecedores/:id', async (req,res) => {

});
router.delete('fornecedores/:id', async (req,res) => {

});
router.post('/pesquisarFornecedoresVip', async (req,res) => {
    const result = await fornecedoresService.pesquisarFornecedoresVip(req.body)
    res.json(result)
})



module.exports = router