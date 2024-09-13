// src/DetailsPage.js
import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
    const location = useLocation();
    const { category, ward } = location.state; // Get props from the navigation state

    return (
    <div className="container bg-[#f0f4fc] mx-auto p-4">
        <h1 className="text-3xl font-bold">Details for {category} in {ward}</h1>

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
