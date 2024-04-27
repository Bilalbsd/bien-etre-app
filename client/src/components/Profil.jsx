import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Profil = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [activity, setActivity] = useState("");

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${user.id}`);
                setUserData(response.data);
                setFirstName(response.data.firstName);
                setLastName(response.data.lastName);
                setActivity(response.data.activity);
            } catch (error) {
                console.error('Failed to fetch user data:', error.response.data);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/users/${user.id}`, {
                firstName,
                lastName,
                activity
            });
            // Mettre à jour l'affichage des données utilisateur après modification
            const updatedUserData = { ...userData, firstName, lastName, activity };
            setUserData(updatedUserData);
        } catch (error) {
            console.error('Failed to update user data:', error.response.data);
        }
    };

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userData?.profilePicture || "/user.jpg"} alt="User profile picture"/>
                    <form onSubmit={handleSubmit}>
                        <input 
                            type="text" 
                            value={firstName} 
                            onChange={(e) => setFirstName(e.target.value)} 
                            placeholder="Prénom" 
                            className="mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
                        />
                        <input 
                            type="text" 
                            value={lastName} 
                            onChange={(e) => setLastName(e.target.value)} 
                            placeholder="Nom de famille" 
                            className="mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
                        />
                        <input 
                            type="text" 
                            value={activity} 
                            onChange={(e) => setActivity(e.target.value)} 
                            placeholder="Activité" 
                            className="mb-2 px-4 py-2 w-full border border-gray-300 rounded-lg"
                        />
                        <button 
                            type="submit" 
                            className="mb-2 px-4 py-2 w-full bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-800 focus:outline-none focus:bg-blue-800"
                        >
                            Enregistrer les modifications
                        </button>
                    </form>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.firstName} {userData?.lastName}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.activity}</span>
                    <div className="flex mt-4 md:mt-6">
                        <NavLink to="/statistics" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Voir statistiques</NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profil;