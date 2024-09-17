import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import { ClipLoader } from 'react-spinners';

const dateOptions = ['2024-09-09', '2024-09-10', '2024-09-11', '2024-09-12', '2024-09-13','2024-09-12', '2024-09-14','2024-09-12', '2024-09-15']; // Define the complete set of dates

const WardCharts = ({ selectedWard }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(`https://ap-flood-control.onrender.com/ward-image-count?ward=${selectedWard}`);
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

        // Initialize data maps with all dates set to 0
        const garbageCounts = dateOptions.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        const mosquitoCounts = dateOptions.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        // Populate the counts with actual data from API
        data.forEach(item => {
            if (garbageCounts.hasOwnProperty(item.date)) {
                garbageCounts[item.date] = item.garbageCount;
            }
            if (mosquitoCounts.hasOwnProperty(item.date)) {
                mosquitoCounts[item.date] = item.mosquitoCount;
            }
        });

        // Convert data maps to arrays for charting
        const garbageData = dateOptions.map(date => ({
            date,
            count: garbageCounts[date]
        }));

        const mosquitoData = dateOptions.map(date => ({
            date,
            count: mosquitoCounts[date]
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
        return  (
        <div className="flex mt-10 justify-center items-center">
            <ClipLoader color={"#123abc"} loading={loading} size={50} />
        </div> // Show a loading message or spinner
        )
    }

    if (error) {
        return <div>Error: {error.message}</div>; // Show an error message
    }

    return (
        <div className="p-2 flex justify-center items-center">
            <div className="flex flex-row space-x-8">
                {/* Garbage Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-8">
                    <h3>Garbage</h3>
                    <Line data={chartData.garbageChart} />
                </div>

                {/* Mosquito Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-8">
                    <h3>Mosquito</h3>
                    <Line data={chartData.mosquitoChart} />
                </div>
            </div>
        </div>
    );
};

export default WardCharts;
