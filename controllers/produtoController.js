const db = require("../config/database");

// Lista todos os produtos
const getAllProdutos = (req, res) => {
  db.query("SELECT * FROM produtos", (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    res.json(results);
  });
};

// Busca um produto por ID
const getProdutoById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM produtos WHERE id =?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (!results.length) {
      return res.status(404).json({ error: "Produto não encontrado" });
    }
    res.json(results[0]);
  });
}
// Cria um novo produto
const createProduto = (req, res) => {
  const { nome, descricao, preco, quantidade_estoque } = req.body;

  db.query(
      'INSERT INTO produtos (nome, descricao, preco, quantidade_estoque) VALUES (?, ?, ?, ?)',
      [nome, descricao, preco, quantidade_estoque],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }

          const produtoId = results.insertId;

          // Adicionar quantidade na tabela estoque
          db.query(
              'INSERT INTO estoque (produto_id, quantidade) VALUES (?, ?)',
              [produtoId, quantidade_estoque],
              (err, results) => {
                  if (err) {
                      return res.status(500).json({ error: err.message });
                  }
                  res.json({ id: produtoId, nome, descricao, preco, quantidade_estoque });
              }
          );
      }
  );
};

// Atualiza um produto existente
const updateProduto = (req, res) => {
  const { id } = req.params;
  const { nome, descricao, preco, quantidade_estoque } = req.body;

  db.query(
      'UPDATE produtos SET nome = ?, descricao = ?, preco = ?, quantidade_estoque = ? WHERE id = ?',
      [nome, descricao, preco, quantidade_estoque, id],
      (err, results) => {
          if (err) {
              return res.status(500).json({ error: err.message });
          }
          if (results.affectedRows === 0) {
              return res.status(404).json({ message: 'Produto não encontrado' });
          }

          // Atualizar quantidade na tabela estoque
          db.query(
              'UPDATE estoque SET quantidade = ? WHERE produto_id = ?',
              [quantidade_estoque, id],
              (err, results) => {
                  if (err) {
                      return res.status(500).json({ error: err.message });
                  }
                  res.json({ id, nome, descricao, preco, quantidade_estoque });
              }
          );
      }
  );
};

// Exclui um produto existente
const deleteProduto = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM produtos WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: err.message });
    }
    if (results.affectedRows === 0) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }
    res.status(204).send({message: "Produto excluído com sucesso"  });
  });
};

module.exports = {
  getAllProdutos,
  createProduto,
  updateProduto,
  deleteProduto,
  getProdutoById
};
