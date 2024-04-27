import React from "react";
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Apropos from '../Layout/Apropos';
import Footer from '../Layout/Footer';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="bg-white text-gray-900 py-20" style={{ marginBottom: '20px' }}>
            <div className="container mx-auto flex flex-col items-center justify-center">
                <h1 className="text-4xl md:text-6xl font-bold mb-4">Bienvenue chez vous</h1>
                <p className="text-lg md:text-xl mb-4">Épanouissez-vous chaque jour : votre chemin vers la sérénité et le bonheur.</p>
                <p className="text-lg md:text-xl mb-8">Découvrez tout ce que nous avons à offrir.</p>
                <Link to="/login" className="mb-20 bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full transition duration-300 ease-in-out">Commencer</Link>
            </div>

            <Apropos />
            <Footer />
        </div>
    );
}

export default Welcome;
