import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js

const WardCharts = ({ selectedWard }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:5000/ward-image-count?ward=${selectedWard}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const result = await response.json();
                setData(result);
            } catch (error) {
                setError(error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [selectedWard]);

    const chartData = useMemo(() => {
        if (loading || error) return {};

        // Prepare data for Garbage chart
        const garbageData = data.map(item => ({
            date: item.date,
            count: item.garbageCount
        }));

        // Prepare data for Mosquito chart
        const mosquitoData = data.map(item => ({
            date: item.date,
            count: item.mosquitoCount
        }));

        return {
            garbageChart: {
                labels: garbageData.map(item => item.date),
                datasets: [
                    {
                        label: 'Garbage Count',
                        data: garbageData.map(item => item.count),
                        borderColor: 'orange',
                        backgroundColor: 'rgba(255, 165, 0, 0.2)', // Lighter background
                        fill: true,
                    }
                ]
            },
            mosquitoChart: {
                labels: mosquitoData.map(item => item.date),
                datasets: [
                    {
                        label: 'Mosquito Count',
                        data: mosquitoData.map(item => item.count),
                        borderColor: 'blue',
                        backgroundColor: 'rgba(0, 0, 255, 0.2)', // Lighter background
                        fill: true,
                    }
                ]
            }
        };
    }, [data, loading, error]);

    if (loading) {
        return <div>Loading...</div>; // Show a loading message or spinner
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Show an error message
    }

    return (
        <div className="p-4 flex justify-center items-center">
            <div className="flex flex-row space-x-8">
                {/* Garbage Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-10">
                    <h3>Garbage</h3>
                    <Line data={chartData.garbageChart} />
                </div>

                {/* Mosquito Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-10">
                    <h3>Mosquito</h3>
                    <Line data={chartData.mosquitoChart} />
                </div>
            </div>
        </div>
    );
};

export default WardCharts;
