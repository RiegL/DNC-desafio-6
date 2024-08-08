const express = require('express');
const router = express.Router();
const clienteController = require('../controllers/clienteController');

// Listar todos os clientes
router.get('/', clienteController.getAllClientes);

// Listar um cliente por ID
router.get('/:id', clienteController.getClientById);

// Adicionar um novo cliente
router.post('/', clienteController.createCliente);

// Atualizar um cliente existente
router.put('/:id', clienteController.updateCliente);

// Deletar um cliente
router.delete('/:id', clienteController.deleteCliente);

module.exports = router;
