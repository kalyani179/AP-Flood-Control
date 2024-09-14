import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'chart.js/auto';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { FaTrash, FaCarCrash, FaHome, FaBug, FaWater } from 'react-icons/fa'; 
import WardCharts from './WardCharts'; // Import WardCharts component
import Navbar from './Navbar';
import Weather from './Weather';

// Registering components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const wardOptions = ['30', '32', '56', '57', '58', '59', '60', '61'];
const dateOptions = ['2024-09-09', '2024-09-10', '2024-09-11', '2024-09-12', '2024-09-13'];

const iconMapping = {
    'garbage': <FaTrash size={40} color="#B05C00" />,
    'vehicle': <FaCarCrash size={40} color="#4CAF50" />,
    'building': <FaHome size={40} color="#FF4D4D" />,
    'mosquito': <FaBug size={40} color="#4CAF50" />,
    'silt': <FaWater size={40} color="#8B4513" />
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedWard, setSelectedWard] = useState(localStorage.getItem('selectedWard') || wardOptions[0]);
    const [selectedDate, setSelectedDate] = useState(localStorage.getItem('selectedDate') || dateOptions[0]);
    const [data, setData] = useState([]);

    useEffect(() => {
        localStorage.setItem('selectedWard', selectedWard);
        localStorage.setItem('selectedDate', selectedDate);
    }, [selectedWard, selectedDate]);

    useEffect(() => {
        fetch('http://localhost:5000/data')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(fetchedData => {
                console.log('Fetched Data:', fetchedData);
                setData(fetchedData);
            })
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    // Filter data based on selected ward and date
    const filteredData = useMemo(() => {
        const result = data.filter(item => item.ward === selectedWard && item.date === selectedDate);
        console.log('Filtered Data:', result);
        return result;
    }, [data, selectedWard, selectedDate]);

    const cardData = useMemo(() => {
        if (!Array.isArray(filteredData)) return [];
    
        return filteredData.map(item => ({
            category: item.type,
            value: item.count,
            latitude:item.latitude,
            longitude:item.longitude,
            title: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            icon: iconMapping[item.type] || null,
            percentage: item.percentage || '0%',
            change: item.change || 'up',
            changeColor: item.changeColor || 'text-gray-500',
            imageUrl: item.imageUrl
        }));
    }, [filteredData]);
    

    const handleCardClick = (category, imageUrl, latitude, longitude) => {
        console.log('Navigating to details with imageUrl:', imageUrl, latitude, longitude);
        navigate('/details', {
            state: { 
                category, 
                ward: selectedWard, 
                date: selectedDate, 
                imageUrl, 
                latitude, 
                longitude 
            }
        });
    };

    return (
        <>
            <Navbar />
        <div className="container mx-auto p-4">
        <div className="flex justify-between mb-6 items-center">
                    {/* Left side - Weather Section */}
                    <div>
                        <Weather /> {/* Render Weather component here */}
                    </div>

                    {/* Right side - Dropdowns */}
                    <div className="flex space-x-8">
                        {/* Ward Dropdown */}
                        <div className="flex flex-col justify-center items-center">
                            <label htmlFor="ward" className="block text-lg font-semibold mb-2">
                                Select Ward
                            </label>
                            <select
                                id="ward"
                                value={selectedWard}
                                onChange={(e) => setSelectedWard(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            >
                                {wardOptions.map((ward, index) => (
                                    <option key={index} value={ward}>
                                        {ward}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date Dropdown */}
                        <div className="flex flex-col justify-center items-center">
                            <label htmlFor="date" className="block text-lg font-semibold mb-2">
                                Select Date
                            </label>
                            <select
                                id="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                                className="p-2 border border-gray-300 rounded-md"
                            >
                                {dateOptions.map((date, index) => (
                                    <option key={index} value={date}>
                                        {date}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>


            {/* Top cards */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-5 gap-4">
                {cardData.length > 0 ? (
                cardData.map((card, index) => (
                    <div
                        key={index}
                        className={`bg-[#f0f4fc] shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${card.changeColor}`}
                        onClick={() => handleCardClick(card.category, card.imageUrl, card.latitude, card.longitude)}
                    >
                        <div className="flex justify-center mb-4">{card.icon}</div>
                        <p className="text-3xl font-bold mb-2">{card.value}</p>
                        <p className="text-gray-500 mb-2">{card.title}</p>
                    </div>
                ))
            ) : (
                <p>No card data available.</p>
            )}
                </div>
            </div>

            {/* WardCharts */}
            <div className="flex-1">
                    <div className="container mx-auto p-4">
                        <WardCharts data={data} selectedWard={selectedWard} />
                    </div>
            </div>
        </div>
        </>
    );
};

export default Dashboard;
