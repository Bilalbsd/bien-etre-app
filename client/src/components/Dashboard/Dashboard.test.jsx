import React from 'react';
import { render, fireEvent, cleanup } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Dashboard from './Dashboard';

// Mock du localStorage
const mockLocalStorage = (() => {
  let store = {};
  return {
    getItem(key) {
      return store[key] || null;
    },
    setItem(key, value) {
      store[key] = value.toString();
    },
    clear() {
      store = {};
    }
  };
})();

// Mock de useNavigate
const mockedNavigate = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedNavigate,
}));


describe('Dashboard Component', () => {
  beforeEach(() => {
    // Réinitialise le localStorage et les mocks avant chaque test
    mockLocalStorage.clear();
    jest.resetAllMocks();
    window.localStorage = mockLocalStorage;
  });

  afterEach(() => {
    cleanup();
  });

  it('renders correctly with no themes selected', () => {
    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );
    expect(getByText('Choisissez un thème')).toBeInTheDocument();
    expect(getByText('ALIMENTATION')).toBeInTheDocument();
  });

  it('navigates when a theme is clicked', () => {
    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );
    const themeElement = getByText('SPORT');
    fireEvent.click(themeElement);
    expect(mockedNavigate).toHaveBeenCalledWith('/sport');
  });

  it('displays the countdown timer for a selected theme', () => {
    // Pré-remplir localStorage avec un thème sélectionné
    mockLocalStorage.setItem('selectedThemes', JSON.stringify({ sport: new Date().getTime() }));
    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );
    const countdownDisplay = getByText(/Revenez dans/);
    expect(countdownDisplay).toBeInTheDocument();
  });

  it('does not navigate when a selected theme is clicked', () => {
    // Pré-remplir localStorage avec un thème sélectionné
    mockLocalStorage.setItem('selectedThemes', JSON.stringify({ sport: new Date().getTime() }));
    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );
    const themeElement = getByText('SPORT');
    fireEvent.click(themeElement);
    expect(mockedNavigate).not.toHaveBeenCalled();
  });

  it('updates localStorage when a new theme is selected', () => {
    const { getByText } = render(
      <Router>
        <Dashboard />
      </Router>
    );
    const themeElement = getByText('HUMEUR');
    fireEvent.click(themeElement);
    expect(localStorage.getItem('selectedThemes')).toContain('humeur');
  });
});

