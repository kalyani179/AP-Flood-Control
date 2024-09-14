// models/DashboardData.js
const mongoose = require('mongoose');

const DashboardDataSchema = new mongoose.Schema({
    imageUrl: String,
    date: String,
    latitude: Number,
    longitude: Number,
    ward: String,
    type: String,
    count: Number,
});

const DashboardData = mongoose.model('DashboardData', DashboardDataSchema, 'DashboardData');


module.exports = DashboardData;
