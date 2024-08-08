const express = require('express');
const router = express.Router();
const produtoController = require('../controllers/produtoController');

// Listar todos os produtos
router.get('/', produtoController.getAllProdutos);

// Listar um produto por ID
router.get('/:id', produtoController.getProdutoById);

// Adicionar um novo produto
router.post('/', produtoController.createProduto);

// Atualizar um produto existente
router.put('/:id', produtoController.updateProduto);

// Deletar um produto
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
