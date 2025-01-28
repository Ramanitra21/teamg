const jwt = require('jsonwebtoken');

// Clé secrète pour signer et vérifier les tokens
const SECRET_KEY = "171269";

function authenticateToken(req, res, next) {
  // Récupère le token dans les headers
  const token = req.headers['authorization']?.split(' ')[1]; // Format "Bearer <token>"

  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé. Token manquant." });
  }

  // Vérifie et décode le token
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token invalide ou expiré." });
    }
    req.user = user; // Ajoute les informations utilisateur dans `req`
    next(); // Passe au prochain middleware ou à la route
  });
}

module.exports = authenticateToken;
