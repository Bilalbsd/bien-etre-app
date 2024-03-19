import React from "react";
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold mb-4 text-center">Welcome</h1>
            <p className="text-lg text-gray-600">Thank you for visiting us!</p>
        </div>
    );
}

export default Welcome;
