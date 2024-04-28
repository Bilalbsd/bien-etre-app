import React from 'react';
import { render, cleanup,fireEvent } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Statistics from './Statistics'; // Assuming you have a component that does the calculation based on local storage data.
import { createMemoryHistory } from 'history';


const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));


// Mocking localStorage
const mockLocalStorage = (responses) => {
  Storage.prototype.getItem = jest.fn((key) => {
    if (key === 'questionnaireResponses') {
      return JSON.stringify(responses);
    }
    return null;
  });

}

describe('Statistics Component', () => {
  afterEach(cleanup); // Cleans up document after each test run, important for not affecting other tests

  it('calculates and displays statistics correctly when responses are present', () => {
    const responses = [
      { id: 1, themeId: "sport", responses: [5, 2, 1, 3, 4] },
      { id: 2, themeId: "humeur", responses: [2, 1, 5, 3, 5] },
      { id: 3, themeId: "cours", responses: [1, 2, 1, 5, 4] },
      { id: 4, themeId: "alimentation", responses: [3, 2, 2, 4, 1] }
    ];
    mockLocalStorage(responses);

    const { getByText } = render(
        <Router>
          <Statistics />
        </Router>
      );

    expect(getByText('SPORT')).toBeInTheDocument();
     // it ok if he find different 3.00
    expect(getByText('3.00')).toBeInTheDocument();

  });

  /*

  it('go to the display statistics when clicked', () => {
    const history = createMemoryHistory();
    const mockedNavigate = jest.fn();
  
    history.push = mockedNavigate; // Mock the navigate function
  
    const { getByText } = render(
      <Router history={history}>
        <Statistics />
      </Router>
    );
  
    const buttonElement = getByText('SPORT');
    fireEvent.click(buttonElement);
  
    expect(mockedNavigate).toHaveBeenCalledWith('/theme/sport');
  }); */

});
