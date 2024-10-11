import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';
import L from 'leaflet';

// Default icon for markers
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const Map = () => {
    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        // Fetch the data from the backend
        axios.get('https://ap-flood-control.onrender.com/map')
            .then(response => {
                setMarkers(response.data);
            })
            .catch(error => {
                console.error('Error fetching map data:', error);
            });
    }, []);

    return (
        <MapContainer center={[16.5314672, 80.6271021]} zoom={13} style={{ height: '600px', width: '100%' }}> {/* Vijayawada coordinates */}
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            {markers.map((marker, index) => (
                <Marker key={index} position={[marker.latitude, marker.longitude]}>
                    <Popup>
                        Type: {marker.type}<br />Latitude: {marker.latitude}<br />Longitude: {marker.longitude}
                    </Popup>
                </Marker>
            ))}
        </MapContainer>
    );
};

export default Map;
