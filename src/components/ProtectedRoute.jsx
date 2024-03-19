import React, { useEffect } from 'react';
import { Navigate, Route } from 'react-router-dom';

// Composant de protection de route
const ProtectedRoute = ({ isLoggedIn, ...props }) => {
  useEffect(() => {
    // Vérifier l'état de connexion au chargement de la page
    if (!isLoggedIn) {
      // Si l'utilisateur n'est pas connecté, rediriger vers la page de connexion
      navigate('/login');
    }
  }, [isLoggedIn]);

  return isLoggedIn ? <Route {...props} /> : <Navigate to="/login" />;
};

export default ProtectedRoute;
