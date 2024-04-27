const fs = require('fs');
const Theme = require('./models/theme.model');
const Question = require('./models/question.model');

// Charger les données JSON depuis le fichier
const data = JSON.parse(fs.readFileSync('questions.json', 'utf8'));

// Parcourir les thèmes
data.themes.forEach(async (themeData) => {
  try {
    // Vérifier si le thème existe déjà dans la base de données
    const existingTheme = await Theme.findOne({ where: { id: themeData.id } });

    // Si le thème existe déjà, ne pas l'insérer à nouveau
    if (existingTheme) {
      console.log(`Le thème avec l'id ${themeData.id} existe déjà.`);
      return;
    }

    // Insérer le thème dans la base de données s'il n'existe pas déjà
    const theme = await Theme.create({
      id: themeData.id,
      color: themeData.color
    });

    // Parcourir les questions du thème
    themeData.questions.forEach(async (questionData) => {
      // Insérer la question associée au thème dans la base de données
      await Question.create({
        id: questionData.id,
        themeId: theme.id,
        question: questionData.question
      });
    });
  } catch (error) {
    console.error('Erreur lors de l\'insertion des données :', error);
  }
});
