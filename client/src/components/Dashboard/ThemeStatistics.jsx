import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LineChart from '../Diagramme/LineChart';
import DoughnutChart from '../Diagramme/DoughnutChart';

const ThemeStatistics = () => {
  const { themeId } = useParams();
  const [themeStats, setThemeStats] = useState({ averageScore: 0, averageQuestionScores: [], scoreEvolution: [], scoreDistribution: {} });

  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem('questionnaireResponses')) || [];
    const themeResponses = storedResponses.filter(response => response.themeId === themeId);

    let totalScore = 0;
    const averageQuestionScores = Array.from({ length: 5 }, () => 0);

    themeResponses.forEach(response => {
      response.responses.forEach((score, index) => {
        averageQuestionScores[index] += score;
        totalScore += score;
      });
    });

    const averageScore = totalScore / (themeResponses.length * 5);

    averageQuestionScores.forEach((totalScore, index) => {
      averageQuestionScores[index] = totalScore / themeResponses.length;
    });

    const scoreEvolution = themeResponses.map(response => response.responses.reduce((acc, score) => acc + score, 0) / 5);

    const scoreDistribution = {};
    themeResponses.forEach(response => {
      response.responses.forEach((score, index) => {
        scoreDistribution[index + 1] = (scoreDistribution[index + 1] || 0) + score;
      });
    });

    setThemeStats({ averageScore, averageQuestionScores, scoreEvolution, scoreDistribution });
  }, [themeId]);

  return (
    <div className="theme-statistics" style={{ textAlign: 'center', padding: '20px' }}>
      <h1 style={{ marginBottom: '20px', fontSize: '2.5rem'}}>Statistiques du thème {themeId}</h1>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '10px' }}>Score moyen :</h2>
        <p>{themeStats.averageScore.toFixed(2)}</p>
      </div>
      
      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ marginBottom: '10px' }}>Évolution du score des questionnaires</h2>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <LineChart scoreEvolution={themeStats.scoreEvolution} />
          </div>
        </div>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ marginBottom: '10px' }}>Répartition des notes moyennes pour chaque question (5 en tout)</h2>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <DoughnutChart scoreDistribution={themeStats.scoreDistribution} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThemeStatistics;
