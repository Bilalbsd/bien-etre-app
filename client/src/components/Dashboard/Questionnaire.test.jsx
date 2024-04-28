import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import Questionnaire from './Questionnaire';

// Mock pour axios
jest.mock('axios');

// Mock pour react-router-dom incluant useNavigate et useParams
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'), // importe toutes les exportations réelles
  useParams: () => ({
    themeId: 'alimentation' // spécifiez un themeId par défaut pour les tests
  }),
  useNavigate: () => jest.fn() // ici, vous définissez un mock pour useNavigate
}));

describe('Questionnaire Component Tests', () => {
  const mockQuestions = [
    { id: 1, question: 'How do you feel today?' },
    { id: 2, question: 'How was your sleep?' }
  ];

  beforeEach(() => {
    // Réinitialiser le mock avant chaque test
    axios.get.mockResolvedValue({ data: mockQuestions });
  });

  it('fetches questions on mount and renders them', async () => {
    const { findByText } = render(
      <BrowserRouter>
        <Questionnaire />
      </BrowserRouter>
    );

    // Vérification de l'appel à axios avec le bon URL
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/api/questions/alimentation');
    });

    // Vérification du rendu des questions
    const question1 = await findByText('How do you feel today?');
    const question2 = await findByText('How was your sleep?');
    expect(question1).toBeInTheDocument();
    expect(question2).toBeInTheDocument();
  });

  it('updates response state on input change', async () => {
    const { findAllByRole } = render(
      <BrowserRouter>
        <Questionnaire />
      </BrowserRouter>
    );

    const radioButtons = await findAllByRole('radio');
    fireEvent.click(radioButtons[0]); // Clique sur le premier bouton radio

    // Vérifiez que le premier bouton radio est bien coché
    expect(radioButtons[0].checked).toBe(true);
  });

  /*
  it('submits responses and navigates on form submit', async () => {
    const navigate = jest.fn();
    const { getByText } = render(
      <BrowserRouter>
        <Questionnaire />
      </BrowserRouter>
    );

    fireEvent.click(getByText('Soumettre'));

    // Attendez et vérifiez que les réponses sont enregistrées et que la navigation a été appelée
    await waitFor(() => {
      expect(localStorage.getItem('questionnaireResponses')).toBeTruthy();
      expect(navigate).toHaveBeenCalledWith('/statistics');
    }); 
  }); */
});
