import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import LineChart from '../Diagramme/LineChart';
import DoughnutChart from '../Diagramme/DoughnutChart';
import recommandations from '../../data/recommandation.json';

const ThemeStatistics = () => {
  const { themeId } = useParams();
  const redirect = useNavigate();
  const [themeStats, setThemeStats] = useState({ averageScore: 0, averageQuestionScores: [], scoreEvolution: [], scoreDistribution: {} });
  const [phrase, setPhrase] = useState("");
  const [conseil, setConseil] = useState("");

  
  useEffect(() => {
    const storedResponses = JSON.parse(localStorage.getItem('questionnaireResponses')) || [];
    const themeResponses = storedResponses.filter(response => response.themeId === themeId);

    if (themeResponses.length === 0) {
      redirect('/' + themeId);
      return;
    }
   
    let totalScore = 0;
    const averageQuestionScores = Array.from({ length: 5 }, () => 0);

    themeResponses.forEach(response => {
      response.responses.forEach((score, index) => {
        averageQuestionScores[index] += score;
        totalScore += score;
      });
    });

    const averageScore = totalScore / (themeResponses.length * 5);

    const reco = {
      "alimentation" : 0,
      "sport" : 1,
      "cours" : 2,
      "humeur" : 3
    }

    const recommandation = recommandations.themes[reco[themeId]].niveaux[Math.floor(averageScore)];
    setConseil(recommandation.conseil);
    setPhrase(recommandation.phrase);

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
      <h1 style={{ marginBottom: '20px', fontSize: '2.5rem' }}>Statistiques du thème {themeId}</h1>
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Score moyen :</h2>
        <p style={{ fontSize: '1.2rem' }}>{themeStats.averageScore.toFixed(2)}</p>
      </div>

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Recommandations</h2>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <p style={{ fontSize: '1.2rem', marginBottom: '10px'}}>{phrase}</p>
            <p>{conseil}</p>
          </div>
        </div>
      </div>

      <div style={{ marginBottom: '40px', display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Évolution du score des questionnaires</h2>
          <div style={{ width: '100%', height: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <LineChart scoreEvolution={themeStats.scoreEvolution} />
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <div style={{ width: '80%' }}>
          <h2 style={{ marginBottom: '10px', fontSize: '1.5rem' }}>Répartition des notes moyennes pour chaque question (5 en tout)</h2>
          <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
            <DoughnutChart scoreDistribution={themeStats.scoreDistribution} />
          </div>
        </div>


      </div>
    </div>

  );
};

export default ThemeStatistics;
