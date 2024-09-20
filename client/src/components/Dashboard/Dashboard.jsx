import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import 'chart.js/auto';
import WardCharts from './WardCharts'; 
import Navbar from '../Navbar/Navbar';
import { ClipLoader } from 'react-spinners';

const wardOptions = ['30', '32', '56', '57', '58', '59', '60', '61','62','63'];
const dateOptions = ['2024-09-10', '2024-09-11', '2024-09-12', '2024-09-13','2024-09-14','2024-09-15','2024-09-16','2024-09-17', '2024-09-18', '2024-09-19', '2024-09-20'];

const iconMapping = {
    'garbage': <img className='w-20 h-20' src="../assets/icons/garbage.png" alt="" />,
    'vehicle': <img className='w-20 h-20' src="../assets/icons/submergedvehicle.png" alt="" />,
    'building': <img className='w-20 h-20' src="../assets/icons/garbage.png" alt="" />,
    'mosquito': <img className='w-20 h-20' src="../assets/icons/mosquito.png" alt="" />,
    'silt': <img className='w-20 h-20' src="../assets/icons/silt.png" alt="" />
};

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedWard, setSelectedWard] = useState(localStorage.getItem('selectedWard') || wardOptions[0]);
    const [selectedDate, setSelectedDate] = useState(localStorage.getItem('selectedDate') || dateOptions[0]);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);  // Loading state

    useEffect(() => {
        localStorage.setItem('selectedWard', selectedWard);
        localStorage.setItem('selectedDate', selectedDate);
    }, [selectedWard, selectedDate]);

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
    // State variables for garbage and mosquito counts
    const [garbageCount, setGarbageCount] = useState(0);
    const [mosquitoCount, setMosquitoCount] = useState(0);

    useEffect(() => {
        const fetchImageCounts = async () => {
            try {
                const response = await fetch(`https://ap-flood-control.onrender.com/image-count?ward=${selectedWard}&date=${selectedDate}`);
                
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
    
                const data = await response.json();
                console.log('Image Counts:', data);
                
                setGarbageCount(data.garbageCount || 0);
                setMosquitoCount(data.mosquitoCount || 0);
            } catch (error) {
                console.error('Error fetching image counts:', error);
            }
        };
    
        fetchImageCounts();
    }, [selectedWard, selectedDate]);
    

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
            latitude: item.latitude,
            longitude: item.longitude,
            title: item.type.charAt(0).toUpperCase() + item.type.slice(1),
            icon: iconMapping[item.type] || null,
            percentage: item.percentage || '0%',
            change: item.change || 'up',
            changeColor: item.changeColor || 'text-gray-500',
            imageUrl: item.imageUrl
        }));
    }, [filteredData]);

    const handleCardClick = (category) => {
        console.log('Navigating to details with imageUrl:');
        navigate('/details', {
            state: { 
                category, 
                ward: selectedWard, 
                date: selectedDate 
            }
        });
    };
    
    return (
        <>
            <Navbar />
            <div className="container mx-auto p-4">
                <div className="w-full flex -mt-24 justify-center items-center mb-6">
                    {/* Dropdowns */}
                    <div className="flex space-x-8 justify-center items-center mx-auto">
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
                {loading ? (
                    <div className="flex mt-10 justify-center items-center">
                        <ClipLoader color={"#123abc"} loading={loading} size={50} />
                    </div>
                ) : (
                    <div className="flex justify-center items-center gap-10"> {/* Adjusted to 2 columns */}
                        <div
                            className={`bg-[#f0f4fc] w-60 h-68 shadow-lg rounded-lg p-10 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
                            onClick={() => handleCardClick('garbage', null, null, null)} // Update with actual params if needed
                        >
                            <div className="flex justify-center mb-4">{iconMapping['garbage']}</div>
                            <p className="text-3xl font-bold mb-2">{garbageCount}</p> {/* Using garbageCount */}
                            <p className="text-gray-500 mb-2">Garbage</p>
                        </div>

                        <div
                            className={`bg-[#f0f4fc] w-60 h-68 shadow-lg rounded-lg p-10 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
                            onClick={() => handleCardClick('mosquito', null, null, null)} 
                        >
                            <div className="flex justify-center mb-4">{iconMapping['mosquito']}</div>
                            <p className="text-3xl font-bold mb-2">{mosquitoCount}</p> {/* Using mosquitoCount */}
                            <p className="text-gray-500 mb-2">Mosquito</p>
                        </div>
                        <div
                            className={`bg-[#f0f4fc] w-60 h-68 shadow-lg rounded-lg p-10 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
                            onClick={() => handleCardClick('Silt Area', null, null, null)} 
                        >
                            <div className="flex justify-center mb-4">{iconMapping['silt']}</div>
                            <p className="text-3xl font-bold mb-2">{0}</p> {/* Using mosquitoCount */}
                            <p className="text-gray-500 mb-2">Silt Area</p>
                        </div>
                        <div
                            className={`bg-[#f0f4fc] w-60 h-68 shadow-lg rounded-lg p-10 text-center cursor-pointer transform transition-transform duration-300 ease-in-out hover:scale-105 active:scale-95`}
                            onClick={() => handleCardClick('Submerged Vehicle', null, null, null)} 
                        >
                            <div className="flex justify-center mb-4">{iconMapping['vehicle']}</div>
                            <p className="text-3xl font-bold mb-2">{0}</p> {/* Using mosquitoCount */}
                            <p className="text-gray-500 mb-2">Submerged Vehicle</p>
                        </div>
                    </div>
                )}
            </div>
                {/* WardCharts */}
                <div className="flex-1">
                    <div className="container mx-auto p-4">
                        <WardCharts data={data} garbageCount={garbageCount} mosquitoCount={mosquitoCount} selectedWard={selectedWard} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default Dashboard;
