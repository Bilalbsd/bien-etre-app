// index.js
const express = require('express');
const cors = require('cors');
const db = require('./config/database');
const userRoutes = require('./routes/user.routes');
const themeRoutes = require('./routes/theme.routes');
const questionRoutes = require('./routes/question.routes'); 
const { authenticate } = require('./middleware/auth.middleware');

const app = express();

const PORT = process.env.PORT || 3000

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/themes', themeRoutes);
app.use('/api/questions', questionRoutes);

// Synchroniser les modèles avec la base de données pour créer les tables
db.sync()
  .then(() => {
    console.log('Connected to database');
    console.log('Database synchronized');
    require('./creation_question.js');
    // Démarrer le serveur une fois que la synchronisation est terminée
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });
