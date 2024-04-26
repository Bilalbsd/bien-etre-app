import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../../data/questions.json'; // Chemin d'accès au fichier de données

const Dashboard = () => {
  const navigate = useNavigate();
  const [selectedThemes, setSelectedThemes] = useState({});
  const [timeRemaining, setTimeRemaining] = useState({});

  useEffect(() => {
    const selectedThemesFromStorage = JSON.parse(localStorage.getItem('selectedThemes')) || {};
    setSelectedThemes(selectedThemesFromStorage);

    const timerIntervals = {};

    // Initialiser les compteurs à rebours pour chaque thème
    Object.keys(selectedThemesFromStorage).forEach((themeId) => {
      const timerInterval = setInterval(() => {
        setTimeRemaining((prevTimeRemaining) => ({
          ...prevTimeRemaining,
          [themeId]: calculateTimeRemaining(selectedThemesFromStorage[themeId]),
        }));
      }, 1000);

      timerIntervals[themeId] = timerInterval;
    });

    return () => {
      Object.values(timerIntervals).forEach((interval) => clearInterval(interval));
    };
  }, []);

  const goToQuestions = (themeId) => {
    const updatedSelectedThemes = { ...selectedThemes, [themeId]: new Date().getTime() };
    localStorage.setItem('selectedThemes', JSON.stringify(updatedSelectedThemes));
    setSelectedThemes(updatedSelectedThemes);
    navigate(`/${themeId}`); // Ici, le `themeId` est ajouté à l'URL
  };

  // Fonction pour calculer le temps restant en secondes
  const calculateTimeRemaining = (selectedTimestamp) => {
    const expirationTimeInSeconds = 24 * 60 * 60; // 24 heures en secondes
    const currentTimeInSeconds = Math.floor(new Date().getTime() / 1000);
    const selectedTimeInSeconds = selectedTimestamp ? Math.floor(selectedTimestamp / 1000) : 0;
    const timeDifference = expirationTimeInSeconds - (currentTimeInSeconds - selectedTimeInSeconds);
    return timeDifference > 0 ? timeDifference : 0;
  };

  // Convertir les secondes en heures, minutes et secondes
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  };

  // Récupérer la liste des thèmes à partir du fichier de données
  const themes = questionsData.themes || [];

  return (
    <>
    <h1 className='text-center' style={{fontSize: '35px', fontWeight: 'bold', textAlign: 'center'}}>Choisissez un thème</h1>
    <div style={{ display: 'flex', justifyContent: 'center', padding: '30px', flexWrap: 'wrap' }}>
      {themes.map((theme) => (
        <div
          key={theme.id}
          onClick={() => {
            if (!selectedThemes[theme.id]) {
              goToQuestions(theme.id);
            }
          }}
          style={{
            position: 'relative',
            width: 'calc(25% - 20px)', // 25% pour 4 colonnes, moins la marge de 20px
            height: '350px', // Hauteur augmentée pour les cartes
            backgroundColor: theme.color,
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            margin: '10px',
            borderRadius: '10px',
            cursor: selectedThemes[theme.id] ? 'not-allowed' : 'pointer',
            opacity: selectedThemes[theme.id] ? 0.5 : 1,
          }}
        >
          {selectedThemes[theme.id] && (
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', borderRadius: '10px' }}>
              <p style={{ color: 'white', fontSize: '35px', fontWeight: 'bold', textAlign: 'center' }}>Revenez dans {formatTime(timeRemaining[theme.id])} heures !</p> {/* Taille de la police augmentée */}
            </div>
          )}
          <p style={{ color: 'white', fontSize: '35px', textAlign: 'center', fontWeight: 'bold', textAlign: 'center' }}>{theme.id.toUpperCase()}</p> {/* Taille de la police augmentée */}
        </div>
      ))}
    </div>
  </>
  

  );
};

export default Dashboard;
