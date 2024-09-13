import React from 'react';
import { FaTrash, FaCarCrash, FaHome, FaBug, FaWater } from 'react-icons/fa'; 
export const CardData = {
    'Ward 1': {
        '2024-01-01': [
            { title: 'Garbage Pileup', value: '12', icon: <FaTrash size={40} color="#B05C00" />, percentage: '12%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Vehicles', value: '5', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Building', value: '2', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '16%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Mosquito Hotspot', value: '8', icon: <FaBug size={40} color="#4CAF50" />, percentage: '20%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Silt Area', value: 'Medium', icon: <FaWater size={40} color="#8B4513" />, percentage: '15%', change: 'up', changeColor: 'text-red-500' },
        ],
        '2024-02-01': [
            { title: 'Garbage Pileup', value: '15', icon: <FaTrash size={40} color="#B05C00" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Vehicles', value: '3', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '5%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Building', value: '4', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '20%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Mosquito Hotspot', value: '10', icon: <FaBug size={40} color="#4CAF50" />, percentage: '25%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Silt Area', value: 'Low', icon: <FaWater size={40} color="#8B4513" />, percentage: '5%', change: 'down', changeColor: 'text-green-500' },
        ],
    },
    'Ward 2': {
        '2024-01-01': [
            { title: 'Garbage Pileup', value: '20', icon: <FaTrash size={40} color="#B05C00" />, percentage: '25%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Vehicles', value: '10', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '15%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Building', value: '5', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '30%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Mosquito Hotspot', value: '12', icon: <FaBug size={40} color="#4CAF50" />, percentage: '18%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Silt Area', value: 'High', icon: <FaWater size={40} color="#8B4513" />, percentage: '20%', change: 'up', changeColor: 'text-red-500' },
        ],
        '2024-02-01': [
            { title: 'Garbage Pileup', value: '18', icon: <FaTrash size={40} color="#B05C00" />, percentage: '20%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Vehicles', value: '12', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '20%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Building', value: '6', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '25%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Mosquito Hotspot', value: '14', icon: <FaBug size={40} color="#4CAF50" />, percentage: '22%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Silt Area', value: 'Medium', icon: <FaWater size={40} color="#8B4513" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
        ],
    },
    'Ward 3': {
        '2024-01-01': [
            { title: 'Garbage Pileup', value: '8', icon: <FaTrash size={40} color="#B05C00" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Vehicles', value: '7', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '12%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Building', value: '1', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Mosquito Hotspot', value: '6', icon: <FaBug size={40} color="#4CAF50" />, percentage: '8%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Silt Area', value: 'Low', icon: <FaWater size={40} color="#8B4513" />, percentage: '8%', change: 'down', changeColor: 'text-green-500' },
        ],
        '2024-02-01': [
            { title: 'Garbage Pileup', value: '9', icon: <FaTrash size={40} color="#B05C00" />, percentage: '15%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Vehicles', value: '5', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Building', value: '2', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '15%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Mosquito Hotspot', value: '7', icon: <FaBug size={40} color="#4CAF50" />, percentage: '12%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Silt Area', value: 'Medium', icon: <FaWater size={40} color="#8B4513" />, percentage: '12%', change: 'up', changeColor: 'text-red-500' },
        ],
    },
    'Ward 4': {
        '2024-01-01': [
            { title: 'Garbage Pileup', value: '18', icon: <FaTrash size={40} color="#B05C00" />, percentage: '20%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Vehicles', value: '9', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '15%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Building', value: '3', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '25%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Mosquito Hotspot', value: '11', icon: <FaBug size={40} color="#4CAF50" />, percentage: '18%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Silt Area', value: 'High', icon: <FaWater size={40} color="#8B4513" />, percentage: '25%', change: 'up', changeColor: 'text-red-500' },
        ],
        '2024-02-01': [
            { title: 'Garbage Pileup', value: '20', icon: <FaTrash size={40} color="#B05C00" />, percentage: '25%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Submerged Vehicles', value: '8', icon: <FaCarCrash size={40} color="#4CAF50" />, percentage: '10%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Submerged Building', value: '4', icon: <FaHome size={40} color="#FF4D4D" />, percentage: '20%', change: 'up', changeColor: 'text-red-500' },
            { title: 'Mosquito Hotspot', value: '13', icon: <FaBug size={40} color="#4CAF50" />, percentage: '22%', change: 'down', changeColor: 'text-green-500' },
            { title: 'Silt Area', value: 'Medium', icon: <FaWater size={40} color="#8B4513" />, percentage: '15%', change: 'up', changeColor: 'text-red-500' },
        ],
    },
};