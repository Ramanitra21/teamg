const express = require('express');
const router = express.Router();
const authenticateToken = require('../config/auth/auth');
const userController = require('../controllers/userController');


router.get('/private', authenticateToken, (req, res) => {
    res.send(`Bienvenue dans la route protégée, utilisateur : ${req.user.name}`);
});

router.post('/login', userController.loginUser);

module.exports = router;