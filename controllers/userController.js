const UserModel = require('../models/UserModel');
const jwt = require('jsonwebtoken');
const userModel = new UserModel();
const SECRET_KEY = "171269"; // Clé secrète pour JWT

exports.loginUser = async (req, res) => {
  try {
    const { mail, mot_de_passe } = req.body;

    // Vérifie les données requises
    if (!mail || !mot_de_passe) {
      return res.status(400).json({
        success: false,
        message: 'Données insuffisantes.'
      });
    }

    // Appelle la méthode du modèle pour vérifier l'utilisateur
    const result = await userModel.loginUser(mail, mot_de_passe);

    if (!result.success) {
      return res.status(401).json(result); // Retourne le message d'erreur du modèle
    }

    // Génère un token JWT si l'utilisateur est authentifié
    const token = jwt.sign(
      { id: result.user.id, name: result.user.prenom },
      SECRET_KEY,
      { expiresIn: '1h' }
    );

    // Réponse en cas de succès
    res.status(200).json({
      success: true,
      message: 'Authentification réussie.',
      token,
      data: result.user
    });
  } catch (error) {
    console.error('Erreur dans loginUser controller :', error.message);
    res.status(500).json({
      success: false,
      message: 'Erreur interne du serveur.'
    });
  }
};
