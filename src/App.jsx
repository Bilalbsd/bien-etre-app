import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Questionnaire from './components/Dashboard/Questionnaire';
import Statistics from './components/Dashboard/Statistics';
import Profil from './components/Profil';
import Register from './components/Auth/Register';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
          <Navbar />
          <Routes>
            <Route exact path='/' element={<Questionnaire />} />
            <Route exact path='/register' element={<Register />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/profil' element={<Profil />} />
            <Route exact path='/statistics' element={<Statistics />} />
          </Routes>
          <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
