const express = require('express');
const router = express.Router();
const themeController = require('../controllers/theme.controller');




// Routes pour les opérations CRUD sur les thèmes
router.post('/', themeController.createTheme); // Créer un nouveau thème
router.get('/', themeController.getAllThemes); // Récupérer tous les thèmes
router.get('/:id', themeController.getThemeById); // Récupérer un thème par son ID
router.put('/:id', themeController.updateThemeById); // Mettre à jour un thème par son ID
router.delete('/:id', themeController.deleteThemeById); // Supprimer un thème par son ID

module.exports = router;
