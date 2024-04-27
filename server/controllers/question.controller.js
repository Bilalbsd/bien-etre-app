const Question = require('../models/question.model');

// Créer une nouvelle question
exports.createQuestion = async (req, res) => {
  try {
    const { id, themeId, question } = req.body;
    const newQuestion = await Question.create({ id, themeId, question });
    res.status(201).json({ message: 'Question created successfully', question: newQuestion });
  } catch (error) {
    res.status(500).json({ message: 'Failed to create question', error: error.message });
  }
};


// Obtenir une question par son ID
exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findByPk(id);
    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }
    res.status(200).json(question);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get question', error: error.message });
  }
};

// Mettre à jour une question par son ID
exports.updateQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const { themeId, question } = req.body;
    await Question.update({ themeId, question }, { where: { id } });
    res.status(200).json({ message: 'Question updated successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to update question', error: error.message });
  }
};

// Supprimer une question par son ID
exports.deleteQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    await Question.destroy({ where: { id } });
    res.status(200).json({ message: 'Question deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete question', error: error.message });
  }
};


// Obtenir toutes les questions
exports.getAllQuestions = async (req, res) => {
    try {
      const questions = await Question.findAll();
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Failed to get questions', error: error.message });
    }
  };



  exports.getQuestionsByTheme = async (req, res) => {
    try {
      const { themeId } = req.params;     
      const questions = await Question.findAll({ where: { themeId } });
  
    
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions by theme:', error);
      res.status(500).json({ message: 'Failed to get questions by theme', error: error.message });
    }
  };
  

// Obtenir les questions par sport
exports.getQuestionsBySport = async (req, res) => {
    try {
      const questions = await Question.findAll({ where: { themeId: 'sport' } });
      res.status(200).json(questions);
    } catch (error) {
      console.error('Error fetching questions by sport:', error);
      res.status(500).json({ message: 'Failed to get questions by sport', error: error.message });
    }
  };    