import React, { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import ClipLoader from 'react-spinners/ClipLoader'; // Import ClipLoader from react-spinners

const DetailsPage = () => {
    const location = useLocation();
    const { category, ward, date } = location.state || {};

    const [loading, setLoading] = useState(true); // Loading state
    const [data, setData] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false); // State to manage modal visibility
    const [selectedImage, setSelectedImage] = useState(null); // State to store the selected image data

    useEffect(() => {
        setLoading(true);  // Set loading to true when data fetching starts
        fetch('https://ap-flood-control.onrender.com/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(fetchedData => {
                console.log('Fetched Data:', fetchedData);
                setData(fetchedData);
                setLoading(false);  // Set loading to false when data fetching is done
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false);  // Set loading to false if there is an error
            });
    }, []);

    const filteredData = useMemo(() => {
        const result = data.filter(item => item.ward === ward && item.date === date && item.type === category);
        console.log('Filtered Data:', result);
        return result;
    }, [data, ward, date]);

    const cardData = useMemo(() => {
        if (!Array.isArray(filteredData)) return [];
        return filteredData.map(item => ({
            category: item.type,
            latitude: item.latitude,
            longitude: item.longitude,
            imageUrl: item.imageUrl
        }));
    }, [filteredData]);

    useEffect(() => {
        // Simulate loading or fetching process for the image
        const timer = setTimeout(() => {
            setLoading(false); // Turn off the loading state once data is ready
        }, 2000); // Adjust the delay as needed for your actual loading time

        return () => clearTimeout(timer); // Clean up the timer if the component unmounts
    }, []);

    const handleImageClick = (item) => {
        setSelectedImage(item);
        setIsModalOpen(true); // Open the modal when an image is clicked
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedImage(null);
    };

    const openGoogleMaps = (latitude, longitude) => {
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

            {/* Display images with click functionality */}
            <div className="flex flex-wrap justify-center gap-4">
                {cardData.length > 0 ? (
                    cardData.map((item, index) => (
                        <div key={index} className="relative bg-white p-4 rounded-xl shadow-xl cursor-pointer">
                            <img
                                src={item.imageUrl}
                                alt={`for ${category}`}
                                className="w-full max-w-md h-auto object-cover"
                                onClick={() => handleImageClick(item)}
                            />
                        </div>
                    ))
                ) : (
                    <p>No images available.</p>
                )}
            </div>

            {/* Modal for larger image view */}
            {isModalOpen && selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-white p-6 pt-10 rounded-xl shadow-xl max-w-lg w-full">
                        <button
                            className="absolute top-2 right-4 text-black hover:text-gray-800"
                            onClick={closeModal}
                        >
                            &#10005; {/* Close (X) symbol */}
                        </button>
                        <img
                            src={selectedImage.imageUrl}
                            alt={`Large view of ${category}`}
                            className="w-full h-auto object-cover"
                        />
                        <div className="mt-4 flex justify-center">
                            <button
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
                                onClick={() => openGoogleMaps(selectedImage.latitude, selectedImage.longitude)}
                            >
                                Go to Location
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </div>
    );
};

export default DetailsPage;
