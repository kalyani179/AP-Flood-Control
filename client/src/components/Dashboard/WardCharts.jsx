import React, { useState, useEffect, useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js
import { ClipLoader } from 'react-spinners';

const dateOptions = ['2024-09-11', '2024-09-12', '2024-09-13', '2024-09-14', '2024-09-15', '2024-09-16', '2024-09-17', '2024-09-18', '2024-09-19', '2024-09-20', '2024-09-21'];

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

        const garbageCounts = dateOptions.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        const mosquitoCounts = dateOptions.reduce((acc, date) => {
            acc[date] = 0;
            return acc;
        }, {});

        data.forEach(item => {
            if (garbageCounts.hasOwnProperty(item.date)) {
                garbageCounts[item.date] = item.garbageCount;
            }
            if (mosquitoCounts.hasOwnProperty(item.date)) {
                mosquitoCounts[item.date] = item.mosquitoCount;
            }
        });

        const garbageData = dateOptions.map(date => ({
            date,
            count: garbageCounts[date]
        }));

        const mosquitoData = dateOptions.map(date => ({
            date,
            count: mosquitoCounts[date]
        }));

        const chartOptions = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                x: {
                    ticks: {
                        font: {
                            size: 14, // Increase x-axis labels size
                        },
                    },
                },
                y: {
                    ticks: {
                        font: {
                            size: 14, // Increase y-axis labels size
                        },
                    },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        font: {
                            size: 15, // Increase legend text size
                        },
                    },
                },
                tooltip: {
                    titleFont: {
                        size: 14, // Increase tooltip title size
                    },
                    bodyFont: {
                        size: 12, // Increase tooltip body size
                    },
                },
            },
        };

        return {
            garbageChart: {
                labels: garbageData.map(item => item.date),
                datasets: [
                    {
                        label: 'Garbage Count',
                        data: garbageData.map(item => item.count),
                        borderColor: 'orange',
                        backgroundColor: 'rgba(255, 165, 0, 0.2)',
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
                        backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        fill: true,
                    }
                ]
            },
            chartOptions, // Add chart options to the chart data
        };
    }, [data, loading, error]);

    if (loading) {
        return (
            <div className="flex mt-10 justify-center items-center">
                <ClipLoader color={"#123abc"} loading={loading} size={50} />
            </div>
        );
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="p-2 flex justify-center items-center">
            <div className="flex flex-row space-x-8">
                {/* Garbage Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-8">
                    <h3 className="text-xl font-bold mb-4">Garbage</h3>
                    <div style={{ width: '500px', height: '300px' }}>
                        <Line data={chartData.garbageChart} options={chartData.chartOptions} />
                    </div>
                </div>

                {/* Mosquito Chart */}
                <div className="bg-[#f0f4fc] shadow-lg rounded-lg p-8">
                    <h3 className="text-xl font-bold mb-4">Mosquito</h3>
                    <div style={{ width: '500px', height: '300px' }}>
                        <Line data={chartData.mosquitoChart} options={chartData.chartOptions} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WardCharts;
