const express = require('express');
const router = express.Router();
const estoqueController = require('../controllers/estoqueController');

// Listar todos os registros de estoque
router.get('/', estoqueController.getAllEstoque);

// Adicionar ou atualizar o estoque para um produto
router.post('/', estoqueController.createOrUpdateEstoque);

module.exports = router;
