// routes/user.routes.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

// Routes pour l'authentification
router.post('/register', userController.register);
router.post('/login', userController.login);

// Routes pour les opérations CRUD sur les utilisateurs
router.get('/', userController.getAllUsers); // Récupérer tous les utilisateurs
router.get('/:id', userController.getUserById); // Récupérer un utilisateur par son ID
router.put('/:id', userController.updateUserById); // Mettre à jour un utilisateur par son ID
router.delete('/:id', userController.deleteUserById); // Supprimer un utilisateur par son ID

module.exports = router;
