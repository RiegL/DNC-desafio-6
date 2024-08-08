const db = require("../config/database");
const moment = require('moment');
// Listar todos os pedidos
exports.getAllPedidos = (req, res) => {
  db.query("SELECT * FROM pedidos", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Adicionar um novo pedido
 
exports.createPedido = (req, res) => {
  const { cliente_id, produto_id, quantidade } = req.body;

  // Verifique se o cliente existe
  db.query(
    "SELECT id FROM clientes WHERE id = ?",
    [cliente_id],
    (err, clientResults) => {
      if (err) return res.status(500).json({ error: err.message });

      if (clientResults.length === 0) {
        return res.status(404).json({ error: "Cliente não encontrado" });
      }

      // Verifique o preço do produto e a quantidade em estoque
      db.query(
        "SELECT preco, quantidade_estoque FROM produtos WHERE id = ?",
        [produto_id],
        (err, productResults) => {
          if (err) return res.status(500).json({ error: err.message });

          if (productResults.length === 0) {
            return res.status(404).json({ error: "Produto não encontrado" });
          }

          const preco = productResults[0].preco;
          const estoqueAtual = productResults[0].quantidade_estoque;

          if (estoqueAtual < quantidade) {
            return res.status(400).json({ error: "Estoque insuficiente para o pedido" });
          }

          // Insira o pedido
          db.query(
            "INSERT INTO pedidos (cliente_id, produto_id, quantidade, preco_unitario) VALUES (?, ?, ?, ?)",
            [cliente_id, produto_id, quantidade, preco],
            (err, pedidoResults) => {
              if (err) return res.status(500).json({ error: err.message });

              // Atualize o estoque
              db.query(
                "UPDATE produtos SET quantidade_estoque = quantidade_estoque - ? WHERE id = ?",
                [quantidade, produto_id],
                (err, updateResults) => {
                  if (err) return res.status(500).json({ error: err.message });

                  // Crie uma venda com base no pedido
                  const totalItem = preco * quantidade;
                  const dataVenda = moment().format('YYYY-MM-DD'); // Data atual
                  
                  db.query(
                    "INSERT INTO vendas (cliente_id, data_venda, valor_total, status) VALUES (?, ?, ?, ?)",
                    [cliente_id, dataVenda, totalItem, 'não pago'],
                    (err, vendaResults) => {
                      if (err) return res.status(500).json({ error: err.message });

                      // Retorne a resposta de sucesso
                      res.status(201).json({
                        pedido_id: pedidoResults.insertId,
                        venda_id: vendaResults.insertId,
                        cliente_id,
                        produto_id,
                        quantidade,
                        preco_unitario: preco,
                        valor_total: totalItem,
                        data_venda: dataVenda
                      });
                    }
                  );
                }
              );
            }
          );
        }
      );
    }
  );
};
