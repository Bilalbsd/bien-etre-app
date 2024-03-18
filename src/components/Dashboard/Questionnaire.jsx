// src/components/Questionnaire.js
import React, { useState } from 'react';

const Questionnaire = ({ onSubmit }) => {
  const [answers, setAnswers] = useState({
    stress: 0,
    anxiety: 0,
    depression: 0,
    sleep: 0,
    energy: 0,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnswers({ ...answers, [name]: parseInt(value) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(answers);
  };

  return (
    <div class="block max-w-xl p-8 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 mx-auto my-10 mb-6"> {/* Modification de max-w-sm à max-w-md et ajout de mb-4 */}
    <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Thème des questions</h5>
    <p class="font-normal text-gray-700 dark:text-gray-400 mb-4">Veuillez répondre à toutes les questions sérieusement !</p> {/* Ajout de mb-4 pour la marge inférieure */}

    <form onSubmit={handleSubmit}>
      <div>
        <label>Stress (1-5):</label>
        <input type="number" min="1" max="5" name="stress" value={answers.stress} onChange={handleInputChange} />
      </div>
      <div>
        <label>Anxiety (1-5):</label>
        <input type="number" min="1" max="5" name="anxiety" value={answers.anxiety} onChange={handleInputChange} />
      </div>
      <div>
        <label>Depression (1-5):</label>
        <input type="number" min="1" max="5" name="depression" value={answers.depression} onChange={handleInputChange} />
      </div>
      <div>
        <label>Sleep Quality (1-5):</label>
        <input type="number" min="1" max="5" name="sleep" value={answers.sleep} onChange={handleInputChange} />
      </div>
      <div>
        <label>Energy Level (1-5):</label>
        <input type="number" min="1" max="5" name="energy" value={answers.energy} onChange={handleInputChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  </div>
  );
};

export default Questionnaire;
