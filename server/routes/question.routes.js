const express = require('express');
const router = express.Router();
const questionController = require('../controllers/question.controller');


router.get('/:themeId', questionController.getQuestionsByTheme);

// Nouvelle route pour le sport
router.get('/sport', questionController.getQuestionsBySport); // Récupérer les questions sur le sport


// Routes pour les opérations CRUD sur les questions
router.post('/', questionController.createQuestion); // Créer une nouvelle question
router.get('/', questionController.getAllQuestions); // Récupérer toutes les questions
router.get('/:id', questionController.getQuestionById); // Récupérer une question par son ID
router.put('/:id', questionController.updateQuestionById); // Mettre à jour une question par son ID
router.delete('/:id', questionController.deleteQuestionById); // Supprimer une question par son ID



module.exports = router;
