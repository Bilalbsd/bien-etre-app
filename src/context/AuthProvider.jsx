import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

// Création du contexte
export const AuthContext = createContext();

// Fonction du contexte pour fournir le contexte aux composants enfants
export const AuthProvider = ({ children }) => {
    // État pour stocker les informations de l'utilisateur
    const [user, setUser] = useState(null);

    // Effet pour décrypter le token et extraire les informations de l'utilisateur lors du chargement initial
    useEffect(() => {
        // Fonction pour décrypter le token et extraire les informations de l'utilisateur
        const decodeToken = () => {
            const token = localStorage.getItem("token");
            if (token) {
                const decoded = jwtDecode(token);
                setUser(decoded);
            }
        };
        // Appel de la fonction de décryptage du token lors du chargement initial
        decodeToken();
    }, []);

    // Fonction pour déconnecter l'utilisateur
    const logout = () => {
        localStorage.removeItem("token");
        setUser(null);
    };

    // Rendu du contexte
    return (
        <AuthContext.Provider value={{ user, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
