import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'; // Importez Link depuis react-router-dom
import questionsData from '../../data/questions.json'; // Chemin d'accès au fichier de données

const Statistics = () => {
  const themes = questionsData.themes || [];
  const [themeStatistics, setThemeStatistics] = useState({});
  const [lastQuestionnaire, setLastQuestionnaire] = useState(null);

  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem('questionnaireResponses')) || [];

    const newThemeStatistics = {};
    themes.forEach((theme) => {
      let totalScore = 0;
      let responseCount = 0;

      const themeResponses = storedResponses.filter(response => response.themeId === theme.id);
      themeResponses.forEach((response) => {
        responseCount += 5;
        totalScore += response.responses.reduce((acc, score) => acc + score, 0);
      });

      const averageScore = responseCount === 0 ? 0 : totalScore / responseCount;

      let smiley;
      if (averageScore <= 1) {
        smiley = '😢';
      } else if (averageScore <= 2) {
        smiley = '😞';
      } else if (averageScore <= 3) {
        smiley = '😐';
      } else if (averageScore <= 4) {
        smiley = '😊';
      } else {
        smiley = '😄';
      }

      newThemeStatistics[theme.id] = { averageScore, smiley };
    });

    setThemeStatistics(newThemeStatistics);

    const lastResponse = storedResponses.length > 0 ? storedResponses[storedResponses.length - 1] : null;
    setLastQuestionnaire(lastResponse);
  }, [themes]);

  const calculateAverageScore = (responses) => {
    if (!responses || responses.length === 0) return '-';
    const totalScore = responses.reduce((acc, score) => acc + score, 0);
    const averageScore = totalScore / responses.length;
    return averageScore.toFixed(2);
  };

  return (
<div style={{ padding: '20px' }}>
  <h1 style={{ textAlign: 'center', fontSize: '35px', fontWeight: 'bold' }}>Statistiques</h1>
  <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
    {themes.map((theme) => (
      <Link key={theme.id} to={`/theme/${theme.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <div
          style={{
            width: '350px', // Largeur augmentée pour les cartes
            height: '350px', // Hauteur augmentée pour les cartes
            backgroundColor: theme.color,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
            borderRadius: '10px',
            cursor: 'pointer',
          }}
        >
          <p style={{ color: 'white', fontSize: '34px', textAlign: 'center', fontWeight: 'bold' }}>{theme.id.toUpperCase()}</p> {/* Taille de la police augmentée */}
          <p style={{ color: 'white', fontSize: '36px', fontWeight: 'bold', textAlign: 'center' }}>
            {themeStatistics[theme.id] ? themeStatistics[theme.id].averageScore.toFixed(2) : '-'}
          </p>
          <p style={{ color: 'white', fontSize: '60px', textAlign: 'center' }}> {/* Taille de la police augmentée */}
            {themeStatistics[theme.id] ? themeStatistics[theme.id].smiley : '-'}
          </p>
        </div>
      </Link>
    ))}
  </div>
  
  {lastQuestionnaire && (
    <div style={{ marginTop: '20px', textAlign: 'center' }}>
      <h2>Dernier questionnaire :</h2>
      <p>Thème : {lastQuestionnaire.themeId}</p>
      <p>Score moyen des questions : {calculateAverageScore(lastQuestionnaire.responses)}</p>
    </div>
  )}
</div>

  );
};

export default Statistics;
