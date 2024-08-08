const express = require('express');
const router = express.Router();
const vendaController = require('../controllers/vendaController');

// Listar todas as vendas
router.get('/', vendaController.getAllVendas);

// Adicionar uma nova venda
router.post('/pagar', vendaController.atualizarStatusVenda);

module.exports = router;
