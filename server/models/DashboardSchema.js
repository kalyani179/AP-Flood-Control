const mongoose = require('mongoose');
const { Schema } = mongoose;

// Define the schema
const ImageSchema = new Schema({
  imageUrl: { type: String, required: true },  // URL of the image, required
  date: { type: Date, required: true },        // Date of image capture, required
  latitude: { type: Number, required: true },  // Latitude coordinate, required
  longitude: { type: Number, required: true }, // Longitude coordinate, required
  ward: { type: String, required: true },      // Ward or region, required
  type: { type: String, required: true },      // Type of image (e.g., nature, urban), required
});

// Add an index for optimizing searches by location (optional)
ImageSchema.index({ latitude: 1, longitude: 1 });

// Create the model based on the schema
const Image = mongoose.model('Image', ImageSchema);

module.exports = Image;

