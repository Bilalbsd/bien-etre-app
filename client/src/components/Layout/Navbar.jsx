import React, { useState, useEffect, useContext } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // État pour suivre si l'utilisateur est connecté
  const [refresh, setRefresh] = useState(false); // État local pour forcer le rafraîchissement de la Navbar
  const navigate = useNavigate(); // Importer useNavigate pour la redirection

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté en utilisant sessionStorage
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true');
  }, [refresh]); 

  const handleLogout = () => {
    // Déconnexion de l'utilisateur en mettant à jour sessionStorage
    sessionStorage.setItem('isLoggedIn', false);
    setIsLoggedIn(false);
    // Rediriger vers la page de connexion
    navigate('/');
  };

  const { user, logout } = useContext(AuthContext);


  return(
    <nav className="bg-white border-gray-200 dark:bg-gray-900">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-1">

        {!isLoggedIn ?  (
                  <NavLink to="/" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><img src="/lotus.png" alt="BienEtreApp" width={50} height={50} /></NavLink>
        ) : (
                  <NavLink to="/dashboard" className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white"><img src="/lotus.png" alt="BienEtreApp" width={50} height={50} /></NavLink>
        )}
      
        <button data-collapse-toggle="navbar-default" type="button" className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
        </button>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-gray-100 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {!isLoggedIn ? (
              <>
                <li>
                  <Link to="/login" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Login</Link>
                </li>
                <li>
                  <Link to="/register" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Register</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/dashboard" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Dashboard</Link>
                </li>
                <li>
                  <Link to="/statistics" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Statistiques</Link>
                </li>
                <li>
                  <Link to="/profil" className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Profil</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Déconnexion</button>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar;
