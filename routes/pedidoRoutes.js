const express = require('express');
const router = express.Router();
const pedidoController = require('../controllers/pedidoController');

// Listar todos os pedidos
router.get('/', pedidoController.getAllPedidos);

// Adicionar um novo pedido
router.post('/', pedidoController.createPedido);

module.exports = router;
