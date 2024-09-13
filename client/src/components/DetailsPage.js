// src/DetailsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
    const location = useLocation();
    const { category, ward, date } = location.state; // Get props from the navigation state

    return (
    <div className="container bg-[#f0f4fc] mx-auto flex flex-col gap-9 p-4">
         {/* Ward and Date */}
            <div className="text-center mb-2">
                <span className="text-blue-600 bg-blue-100 px-4 py-2 rounded-full text-xl">{ward} | {date}</span>
            </div>

            {/* Category Title */}
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">{category}</h1>

        {/* Display images based on category and ward */}
        <div className="grid grid-cols-3 gap-4 mt-4">
        {/* Replace these with actual images */}
        <div className="bg-gray-200 h-40">Image 1 for {category}</div>
        <div className="bg-gray-200 h-40">Image 2 for {category}</div>
        <div className="bg-gray-200 h-40">Image 3 for {category}</div>
        </div>
    </div>
    );
};

export default DetailsPage;
