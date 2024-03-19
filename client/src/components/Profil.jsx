import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthProvider";
import axios from "axios";
import { NavLink } from "react-router-dom";

const Profil = () => {
    const { user } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/users/${user.id}`);
                setUserData(response.data);
                console.log(userData, "useContext AuthProvider");
            } catch (error) {
                console.error('Failed to fetch user data:', error.response.data);
            }
        };

        if (user) {
            fetchUserData();
        }
    }, [user]);

    return (
        <div className="flex justify-center items-center mt-10">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <div className="flex justify-end px-4 pt-4">
                </div>
                <div className="flex flex-col items-center pb-10">
                    <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src={userData?.profilePicture || "/user.jpg"} alt="User profile picture"/>
                    <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData?.firstName} {userData?.lastName}</h5>
                    <span className="text-sm text-gray-500 dark:text-gray-400">{userData?.activity}</span>
                    <div className="flex mt-4 md:mt-6">
                        <NavLink to="/statistics" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Voir statistiques</NavLink>
                        <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Modifier</a>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Profil;
