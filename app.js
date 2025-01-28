const express = require('express');
const bodyParser = require('body-parser');
const route = require('./route/route')

const app = express();

app.use(bodyParser.json());

app.use('/api', route);

// Démarrer le serveur
app.listen(3000, () => {
  console.log("Serveur démarré sur le port 3000.");
});
