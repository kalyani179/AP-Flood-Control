import React, { useState } from 'react';
import { FaTrash, FaCarCrash, FaHome, FaBug, FaWater } from 'react-icons/fa'; 
import { Line, Bar } from 'react-chartjs-2';
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
const dateOptions = ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'];

const Dashboard = () => {
  // Line chart data
  const lineChartData = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "Monthly Performance",
        data: [65, 59, 80, 81, 56, 55, 40, 70],
        fill: false,
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "#4bc0c0",
      },
    ],
  };


  // Bar chart data
const barChartData = {
labels: ["Activity 1", "Activity 2", "Activity 3", "Activity 4"],
datasets: [
    {
    label: "Activity",
    data: [12, 19, 3, 5],
    backgroundColor: "rgba(75,192,192,0.4)",
    borderColor: "#4bc0c0",
    },
    {
    label: "Another Activity",
    data: [5, 10, 15, 7],
    backgroundColor: "rgba(153,102,255,0.4)",
    borderColor: "#9933ff",
    },
],
};

const cardData = [
{
    title: 'Garbage Pileup',
    value: '12',
    icon: <FaTrash size={40} color="#B05C00" />,
    percentage: '12%',
    change: 'up',
    changeColor: 'text-red-500',
},
{
    title: 'Submerged Vehicles',
    value: '0',
    icon: <FaCarCrash size={40} color="#4CAF50" />,
    percentage: '15%',
    change: 'down',
    changeColor: 'text-green-500',
},
{
    title: 'Submerged Building',
    value: '0',
    icon: <FaHome size={40} color="#FF4D4D" />,
    percentage: '16%',
    change: 'up',
    changeColor: 'text-red-500',
},
{
    title: 'Mosquito Hotspot',
    value: '5',
    icon: <FaBug size={40} color="#4CAF50" />,
    percentage: '10%',
    change: 'down',
    changeColor: 'text-green-500',
},
{
    title: 'Silt Area',
    value: 'High',
    icon: <FaWater size={40} color="#8B4513" />,
    percentage: '10%',
    change: 'down',
    changeColor: 'text-green-500',
},
];

  // State for selected ward and date
const [selectedWard, setSelectedWard] = useState(wardOptions[0]);
const [selectedDate, setSelectedDate] = useState(dateOptions[0]);

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
          <div key={index} className="bg-white shadow-lg rounded-lg p-6 text-center">
            <div className="flex justify-center mb-10">{card.icon}</div>
            <p className="text-3xl font-bold mb-5">{card.value}</p>
            <p className="text-gray-500 mb-2">{card.title}</p>
            <p className={`flex items-center justify-center text-base font-semibold ${card.changeColor}`}>
              {card.change === 'up' ? '↑' : '↓'} {card.percentage}
            </p>
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
