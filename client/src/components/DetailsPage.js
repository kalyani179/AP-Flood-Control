import React from 'react';
import { useLocation } from 'react-router-dom';

const DetailsPage = () => {
    const location = useLocation();
    const { category, ward, date, imageUrl } = location.state; // Get props from the navigation state

    console.log('Received imageUrl in DetailsPage:', imageUrl); // Debugging line

    return (
        <div className="container bg-[#f0f4fc] mx-auto flex flex-col gap-9 p-4">
            {/* Ward and Date */}
            <div className="text-center mb-2">
                <span className="text-blue-600 bg-blue-100 px-6 border border-blue-700 py-2 rounded-full text-xl">{ward} | {date}</span>
            </div>

            {/* Category Title */}
            <h1 className="text-center text-3xl font-bold text-gray-800 mb-6">{category}</h1>

            {/* Display image */}
            <div className="flex justify-center mt-4">
                {imageUrl ? (
                    <img src={imageUrl} alt={`Image for ${category}`} className="w-full max-w-md h-auto object-cover" />
                ) : (
                    <p>No image available.</p>
                )}
            </div>
        </div>
    );
};

export default DetailsPage;
