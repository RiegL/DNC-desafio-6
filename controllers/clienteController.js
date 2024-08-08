const db = require("../config/database");

// Listar todos os clientes
exports.getAllClientes = (req, res) => {
  db.query("SELECT * FROM clientes", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};

// Buscar um cliente por ID
exports.getClientById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM clientes WHERE id = ?", [id], (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Erro ao buscar cliente" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Cliente não encontrado" });
    }
    res.json({ message: "Cliente encontrado", data: results[0] });
  });
};

// Adicionar um novo cliente
exports.createCliente = (req, res) => {
  const { nome, email, telefone, endereco } = req.body;
  db.query(
    "INSERT INTO clientes (nome, email, telefone,endereco) VALUES (?, ?, ?,?)",
    [nome, email, telefone,endereco],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: results.insertId, nome, email, telefone, endereco });
    }
  );
};

// Atualizar um cliente existente
exports.updateCliente = (req, res) => {
  const { id } = req.params;
  const { nome, email, telefone, endereco } = req.body;
  db.query(
    "UPDATE clientes SET nome = ?, email = ?, telefone = ?, endereco = ? WHERE id = ?",
    [nome, email, telefone, endereco, id],
    (err, results) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id, nome, email, telefone, endereco });
    }
  );
};

// Deletar um cliente
exports.deleteCliente = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM clientes WHERE id = ?", [id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(204).send();
  });
};
