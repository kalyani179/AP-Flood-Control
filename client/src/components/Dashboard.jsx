import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
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
            title: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            icon: iconMapping[item.type] || null,
            percentage: item.percentage || '0%',
            change: item.change || 'up',
            changeColor: item.changeColor || 'text-gray-500'
        }));
    }, [filteredData]);

    const lineChartData = useMemo(() => {
        if (!Array.isArray(data)) return { labels: [], datasets: [{ label: 'No Data', data: [], borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' }] };

        const dataForWard = data.filter(item => item.ward === selectedWard);
        console.log('Data for Ward:', dataForWard);

        if (!dataForWard.length) {
            return { labels: [], datasets: [{ label: 'No Data', data: [], borderColor: 'rgba(75, 192, 192, 1)', backgroundColor: 'rgba(75, 192, 192, 0.2)' }] };
        }
        
        return {
            labels: dataForWard.map(item => item.date),
            datasets: [
                {
                    label: 'Data',
                    data: dataForWard.map(item => item.count),
                    borderColor: 'rgba(75, 192, 192, 1)',
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                }
            ]
        };
    }, [data, selectedWard]);

    const handleCardClick = (category) => {
        navigate('/details', { state: { category, ward: selectedWard, date: selectedDate } });
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex space-x-8 mb-6 justify-center items-center">
                {/* Ward Dropdown */}
                <div>
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
                <div>
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

            {/* Top cards */}
            <div className="container mx-auto p-4">
                <div className="grid grid-cols-5 gap-4">
                    {cardData.length > 0 ? (
                        cardData.map((card, index) => (
                            <div
                                key={index}
                                className={`bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95 ${card.changeColor}`}
                                onClick={() => handleCardClick(card.category)}
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

            {/* Graphs */}
            {/* <div className="bg-white shadow-lg rounded-lg p-10 m-10 mx-28">
                <h3 className="text-xl font-semibold mb-4">Monthly Performance</h3>
                <Line data={lineChartData} options={{ maintainAspectRatio: false }} />
            </div> */}
        </div>
    );
};

export default Dashboard;
