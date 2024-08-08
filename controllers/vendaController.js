const db = require("../config/database");

// Listar todas as vendas
exports.getAllVendas = (req, res) => {
  db.query("SELECT * FROM vendas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Atualizar o status da venda
exports.atualizarStatusVenda = (req, res) => {
  const { vendas_id, status } = req.body;

  // Verifique se a venda existe
  db.query(
    "SELECT * FROM vendas WHERE id = ?",
    [vendas_id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });

      if (results.length === 0) {
        return res.status(404).json({ error: "Venda não encontrada" });
      }

      // Defina o status como "não pago" se não for fornecido
      const novoStatus = status === 'pago' ? 'pago' : 'não pago';

      // Atualize o status da venda
      db.query(
        "UPDATE vendas SET status = ? WHERE id = ?",
        [novoStatus, vendas_id],
        (err, updateResults) => {
          if (err) return res.status(500).json({ error: err.message });

          res.status(200).json({ message: `Status da venda atualizado para '${novoStatus}'` });
        }
      );
    }
  );
};
