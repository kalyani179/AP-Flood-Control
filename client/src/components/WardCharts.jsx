import React, { useMemo } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto'; // Import Chart.js

const WardCharts = ({ data, selectedWard }) => {
    const chartDataForWard = useMemo(() => {
        // Filter data by selected ward
        const dataForWard = data.filter(item => item.ward === selectedWard);
        
        // Group data by type
        const groupedByType = dataForWard.reduce((acc, item) => {
            if (!acc[item.type]) acc[item.type] = [];
            acc[item.type].push(item);
            return acc;
        }, {});

        // Return an array of chart configurations for each type
        return Object.keys(groupedByType).map(type => {
            const items = groupedByType[type];

            return {
                type, // The category (e.g., garbage, vehicle)
                title: type.charAt(0).toUpperCase() + type.slice(1), // Capitalized title
                data: {
                    labels: items.map(item => item.date), // Dates for x-axis
                    datasets: [
                        {
                            label: type,
                            data: items.map(item => item.count), // Counts for y-axis
                            borderColor: type === 'garbage' ? 'orange' : type === 'vehicle' ? 'blue' : 'green', // Custom color
                            backgroundColor: type === 'garbage' ? 'rgba(255, 165, 0, 0.2)' : 'rgba(0, 0, 255, 0.2)', // Lighter background
                            fill: true,
                        }
                    ]
                }
            };
        });
    }, [data, selectedWard]);

    return (
        <div className="flex flex-row space-x-8">
            {chartDataForWard.map((chart, index) => (
                <div key={index} className="bg-white shadow-lg rounded-lg p-10 ">
                    <h3>{chart.title}</h3>
                    <Line data={chart.data} />
                </div>
            ))}
        </div>
    );
};

export default WardCharts;
