import React from 'react';
import { useNavigate } from 'react-router-dom';
import questionsData from '../../data/questions.json'; // Chemin d'accès au fichier de données

const Dashboard = () => {
  const navigate = useNavigate();

  const goToQuestions = (themeId) => {
    navigate(`/${themeId}`); // Ici, le `themeId` est ajouté à l'URL
  };

  // Récupérer la liste des thèmes à partir du fichier de données
  const themes = questionsData.themes || [];


  return (
    <>
      <h1 className='text-center '>Choisissez un thème </h1>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
        {themes.map((theme) => (
          <div
            key={theme.id}
            onClick={() => goToQuestions(theme.id)}
            style={{
              width: '200px',
              height: '200px',
              backgroundColor: theme.color,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              margin: '10px', // Ajout de la marge
              borderRadius: '10px',
              cursor: 'pointer',
            }}
          >
            <p style={{ color: 'white', fontSize: '18px', textAlign: 'center' }}>{theme.id}</p>
          </div>
        ))}
      </div>
    </>
  );
};

export default Dashboard;
