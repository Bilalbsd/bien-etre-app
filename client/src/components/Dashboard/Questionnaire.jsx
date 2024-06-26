import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Importer Axios

const Questionnaire = () => {
  const { themeId } = useParams(); // Récupérer le themeId depuis les paramètres d'itinéraire
  const navigate = useNavigate();

  // Déclaration de l'état pour les questions
  const [questions, setQuestions] = useState([]);
  
  // Créer un état pour stocker les réponses
  const [responses, setResponses] = useState([]);

  // État pour suivre le pourcentage de progression
  const [progressPercentage, setProgressPercentage] = useState(0);

  useEffect(() => {
    // Fonction pour récupérer les questions depuis le serveur avec Axios
    const fetchQuestions = async () => {
      try {
        // Faire une requête GET pour récupérer les questions du thème spécifié
        const response = await axios.get(`http://localhost:3000/api/questions/${themeId}`);
        // Extraire les données de la réponse
        const data = response.data;
        // Mettre à jour l'état des questions avec les données récupérées
        setQuestions(data);
        // Initialiser les réponses avec des valeurs par défaut
        setResponses(new Array(data.length).fill(null));


      } catch (error) {
        console.error('Erreur lors de la récupération des questions:', error);
      }
    };

    fetchQuestions();
  }, [themeId]);

  // Fonction pour gérer le changement de réponse à une question
  const handleInputChange = (index, value) => {
    setResponses(responses.map((response, i) => (i === index ? value : response)));
  };

  // Fonction pour enregistrer les réponses et naviguer vers la page des statistiques
  const saveResponses = (responses, themeId) => {
    // Récupérer les réponses précédentes
    const storedResponses = JSON.parse(localStorage.getItem('questionnaireResponses')) || [];
    // Récupérer le dernier ID enregistré
    const lastId = storedResponses.length > 0 ? storedResponses[storedResponses.length - 1].id : 0;
    // Générer le nouvel ID en l'incrémentant de 1
    const responseId = lastId + 1;
    // Enregistrer les nouvelles réponses avec le thème et l'ID de réponse
    const updatedResponses = [...storedResponses, { id: responseId, themeId, responses }];
    localStorage.setItem('questionnaireResponses', JSON.stringify(updatedResponses));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Réponses soumises:', responses);
    // Enregistrer les réponses avec le thème
    saveResponses(responses, themeId);
    // Calculer le pourcentage de progression
    const filledResponses = responses.filter(Boolean);
    const percentage = (filledResponses.length / responses.length) * 100;
    setProgressPercentage(percentage);
    // Rediriger vers la page statistique
    navigate(`/statistics`);
  };

  useEffect(() => {
    const filledResponses = responses.filter(Boolean);
    const percentage = (filledResponses.length / questions.length) * 100;
    setProgressPercentage(percentage);
  }, [responses, questions]);


  return (
    <div className="container mt-5">
      <h1 className="modal-title text-center mb-4">Questionnaire sur {themeId}</h1>
      <form onSubmit={handleSubmit}>
        {questions.map((question, index) => (
          <div key={question.id} className="mb-4">
            <label htmlFor={`question-${question.id}`} className="form-label">{question.question}</label>
            <div className="d-flex justify-content-around">
              {[1, 2, 3, 4, 5].map((score) => (
                <div key={score} className="form-check form-check-inline">
                  <input
                    type="radio"
                    className="form-check-input"
                    id={`question-${question.id}-${score}`}
                    name={`question-${question.id}`}
                    value={score}
                    checked={responses[index] === score}
                    onChange={(e) => handleInputChange(index, parseInt(e.target.value))}
                  />
                  <label className="form-check-label" htmlFor={`question-${question.id}-${score}`}>
                    {score === 1 && '😢'}
                    {score === 2 && '😞'}
                    {score === 3 && '😐'}
                    {score === 4 && '😊'}
                    {score === 5 && '😄'}
                  </label>
                </div>
              ))}
            </div>
          </div>
        ))}
        <button type="buton" className="btn btn-primary">Soumettre</button>
      </form>
      <div className="progress mt-4" style={{ height: '30px' }}>
        <div className="progress-bar" role="progressbar" style={{ width: `${progressPercentage}%` }} aria-valuenow={progressPercentage} aria-valuemin="0" aria-valuemax="100"></div>
      </div>
    </div>
  );
};

export default Questionnaire;
