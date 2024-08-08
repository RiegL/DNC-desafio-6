require('dotenv').config();  // Carrega as variáveis de ambiente do arquivo .env
const express = require('express');
const cors = require('cors');
const db = require('./config/database');  // Conexão com o banco de dados

const produtoRoutes = require('./routes/produtoRoutes');  // Importa as rotas de produtos
const clienteRoutes = require('./routes/clienteRoutes');  // Importa as rotas de clientes
const vendaRoutes = require('./routes/vendaRoutes');  // Importa as rotas de vendas
const pedidoRoutes = require('./routes/pedidoRoutes');  // Importa as rotas de pedidos
const estoqueRoutes = require('./routes/estoqueRoutes');  // Importa as rotas de estoque

const app = express();

// Middlewares
app.use(cors());  // Permite requisições de outros domínios
app.use(express.json());  // Faz o parsing do corpo das requisições como JSON

// Rotas
app.use('/produtos', produtoRoutes);  // Define as rotas de produtos
app.use('/clientes', clienteRoutes);  // Define as rotas de clientes
app.use('/vendas', vendaRoutes);  // Define as rotas de vendas
app.use('/pedidos', pedidoRoutes);  // Define as rotas de pedidos
app.use('/estoque', estoqueRoutes);  // Define as rotas de estoque

// Rota inicial
app.get('/', (req, res) => {
  res.send('Bem-vindo à API DNCommerce!');
});

// Configuração da porta
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
