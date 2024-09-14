import React, { useState, useEffect } from 'react';

// Replace with your OpenWeatherMap API key and the endpoint
const API_KEY = '7ec5fd6e1b670cad400104e7b2f05f0f';
const CITY = 'Vijayawada';
const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${CITY}&appid=${API_KEY}&units=metric`;

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch the weather data
        fetch(API_URL)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setWeatherData({
                    city: data.name,
                    temperature: data.main.temp + '°C',
                    description: data.weather[0].description,
                    icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
                });
                setLoading(false);
            })
            .catch(error => {
                setError(error.message);
                setLoading(false);
            });
    }, []);

    if (loading) return <p>Loading weather...</p>;
    if (error) return <p>Error fetching weather data: {error}</p>;

    return (
        <div className="flex flex-col text-center">
            <h3 className="text-sm -my-2">{weatherData.city}</h3>
            <img src={weatherData.icon} alt="Weather Icon" className="mx-auto -my-3 text-xl" />
            <p className="text-2xl font-bold">{weatherData.temperature}</p>
            <p className="text-md text-gray-600">{weatherData.description}</p>
        </div>
    );
};

export default Weather;
