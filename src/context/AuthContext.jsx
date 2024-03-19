import React, { createContext, useState } from "react";

// Créer le contexte d'authentification
export const AuthContext = createContext();

// Créer le fournisseur du contexte d'authentification
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
            {children}
        </AuthContext.Provider>
    );
};