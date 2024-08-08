const db = require("../config/database");

// Listar todos os registros de estoque
exports.getAllEstoque = (req, res) => {
  db.query("SELECT * FROM estoque", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Adicionar ou atualizar o estoque para um produto
exports.createOrUpdateEstoque = (req, res) => {
  const { produto_id, quantidade } = req.body;

  db.query(
    "INSERT INTO estoque (produto_id, quantidade) VALUES (?, ?) ON DUPLICATE KEY UPDATE quantidade = VALUES(quantidade)",
    [produto_id, quantidade],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      // Update the corresponding quantidade_estoque in the produtos table
      db.query(
        "UPDATE produtos SET quantidade_estoque = ? WHERE id = ?",
        [quantidade, produto_id],
        (updateErr) => {
          if (updateErr) return res.status(500).json({ error: updateErr.message });
          res.status(201).json({ produto_id, quantidade });
        }
      );
    }
  );
};
