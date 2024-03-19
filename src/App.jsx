import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login'; // Importez le composant Login
import Dashboard from './components/Dashboard/Dashboard';
import Statistics from './components/Dashboard/Statistics';
import Profil from './components/Profil';
import Register from './components/Auth/Register';
import Welcome from './components/Dashboard/Welcome';
import ThemeStatistics from './components/Dashboard/ThemeStatistics';
import Questionnaire from './components/Dashboard/Questionnaire';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre si l'utilisateur est connecté


  return (
    <Router>
      <div className="App">
        <Navbar isLoggedIn={isLoggedIn} /> {/* Passez l'état isLoggedIn à la barre de navigation */}
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/login" element={<Login />} /> 
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/profil" element={<Profil />} />
          <Route exact path="/statistics" element={<Statistics />} />
          <Route path="/theme/:themeId" element={<ThemeStatistics />} />
          <Route path="/:themeId" element={<Questionnaire />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
