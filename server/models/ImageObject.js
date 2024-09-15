// models/ImageObject.js
const mongoose = require('mongoose');

const ImageObjectSchema = new mongoose.Schema({
    imageUrl: String,
    date: String,
    latitude: Number,
    longitude: Number,
    ward: String,
    type: String,
    count: Number,
});

// Map the model to the 'imageObject' collection explicitly
const ImageObject = mongoose.model('ImageObject', ImageObjectSchema, 'imageObject');

module.exports = ImageObject;
