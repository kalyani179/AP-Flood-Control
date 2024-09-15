import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from react-spinners

const DetailsPage = () => {
    const location = useLocation();
    const { category, ward, date, imageUrl, latitude, longitude } = location.state || {};

    const [loading, setLoading] = useState(true); // Loading state

    useEffect(() => {
        // Simulate loading or fetching process for the image
        const timer = setTimeout(() => {
            setLoading(false); // Turn off the loading state once data is ready
        }, 2000); // Adjust the delay as needed for your actual loading time

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, []);

    const handleImageClick = () => {
        if (latitude && longitude) {
            const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
            window.open(googleMapsUrl, '_blank');
        } else {
            alert('Location coordinates are not available.');
        }
    };

    // Conditionally render loader or details page based on the loading state
    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <ClipLoader color={"#123abc"} loading={loading} size={100} /> {/* Loader component */}
            </div>
        );
    }

    return (
        <div className="container mt-9 mx-auto flex flex-col gap-9 p-4">
            {/* Ward and Date */}
            <div className="text-center">
                <span className="text-blue-600 bg-blue-100 px-6 border border-blue-700 py-2 rounded-full text-xl">
                    {ward} | {date}
                </span>
            </div>

            {/* Category Title */}
            <h1 className="text-center text-3xl font-bold text-gray-800">{category}</h1>

            {/* Display image with click functionality */}
            <div className="flex justify-center">
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt={`for ${category}`}
                        className="w-full max-w-md h-auto object-cover cursor-pointer"
                        onClick={handleImageClick}
                    />
                ) : (
                    <p>No image available.</p>
                )}
            </div>
        </div>
    );
};

export default DetailsPage;
