import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Login from './components/Auth/Login';
import Signup from './components/Auth/Signup';
import Questionnaire from './components/Dashboard/Questionnaire';
import Statistics from './components/Dashboard/Statistics';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path='/' element={<Questionnaire />} />
          <Route exact path='/signup' element={<Signup />} />
          <Route exact path='/login' element={<Login />} />
          <Route exact path='/statistics' element={<Statistics />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
