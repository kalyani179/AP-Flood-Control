import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Line, Bar } from 'react-chartjs-2';
import { CardData } from './Dashboard Data/CardData';
import { LineChartData } from './Dashboard Data/LineChartData';
import { BarGraphData } from './Dashboard Data/BarGraphData';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Registering components
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend
);


const wardOptions = ['Ward 1', 'Ward 2', 'Ward 3', 'Ward 4'];
const dateOptions = ['2024-01-01', '2024-02-01'];

const getCardData = (ward, date) => {
    return CardData[ward]?.[date] || [];
};

const getLineChartData = (ward, date) => {
    return LineChartData[ward]?.[date] || {};
};

const getBarChartData = (ward, date) => {
    return BarGraphData[ward]?.[date] || {};
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedWard, setSelectedWard] = useState(wardOptions[0]);
    const [selectedDate, setSelectedDate] = useState(dateOptions[0]);

    const cardData = useMemo(() => getCardData(selectedWard, selectedDate), [selectedWard, selectedDate]);
    const lineChartData = useMemo(() => getLineChartData(selectedWard, selectedDate), [selectedWard, selectedDate]);
    const barChartData = useMemo(() => getBarChartData(selectedWard, selectedDate), [selectedWard, selectedDate]);
    
    const handleCardClick = (category) => {
        navigate('/details', { state: { category, ward: selectedWard,date : selectedDate } });
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
                {cardData.map((card, index) => (
                    <div
                        key={index}
                        className="bg-white shadow-lg rounded-lg p-6 text-center cursor-pointer"
                        onClick={() => handleCardClick(card.category)}
                    >
                        <div className="flex justify-center mb-10">{card.icon}</div>
                        <p className="text-3xl font-bold mb-5">{card.value}</p>
                        <p className="text-gray-500 mb-2">{card.title}</p>
                    </div>
                    ))}
                </div>
            </div>

            {/* Graphs */}
            <div className="grid grid-cols-2 gap-4 py-10">
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Monthly Performance</h3>
                    <Line data={lineChartData} />
                </div>
                <div className="bg-white shadow-lg rounded-lg p-6">
                    <h3 className="text-xl font-semibold mb-4">Activity Comparison</h3>
                    <Bar data={barChartData} />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
