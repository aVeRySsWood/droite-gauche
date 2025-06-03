const express = require('express');
const path = require('path');
const app = express();
const db = require('./config');

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Obtenir toutes les choses
app.get('/api/things', (req, res) => {
  db.query('SELECT * FROM things', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Ajouter une chose
app.post('/api/things', (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).send('Nom requis');
  db.query('INSERT INTO things (name) VALUES (?)', [name], (err, result) => {
    if (err) return res.status(500).send(err);
    res.status(201).json({ id: result.insertId, name, left_votes: 0, right_votes: 0 });
  });
});

// Voter pour une chose
app.post('/api/things/:id/vote', (req, res) => {
  const { side } = req.body;
  const id = req.params.id;

  if (side !== 'left' && side !== 'right') {
    return res.status(400).send('Vote invalide');
  }

  const column = side === 'left' ? 'left_votes' : 'right_votes';
  db.query(`UPDATE things SET ${column} = ${column} + 1 WHERE id = ?`, [id], (err) => {
    if (err) return res.status(500).send(err);
    res.status(200).send('Vote enregistré');
  });
});

// Lancement serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Serveur lancé sur le port ${PORT}`);
});
