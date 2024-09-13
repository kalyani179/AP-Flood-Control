// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import the Image model
// const Image = require('./models/Image');

const app = express();
app.use(cors());
app.use(express.json()); // Middleware to parse incoming JSON data

// Connect to MongoDB
mongoose.connect('mongodb+srv://dantulurikalyani999:gQOrNigXOpa5PtYF@cluster0.uabah.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// API route to upload image data
app.post('/api/upload', async (req, res) => {
    try {
        const { imageUrl, date, latitude, longitude, ward, type } = req.body;

        // Create a new image document
        const newImage = new Image({
            imageUrl,
            date,
            latitude,
            longitude,
            ward,
            type
        });

        // Save the image to the database
        const savedImage = await newImage.save();
        res.status(201).json(savedImage);
    } catch (err) {
        res.status(500).json({ error: 'Error uploading image data' });
    }
});

// API route to fetch all images
app.get('/api/images', async (req, res) => {
    try {
        const images = await Image.find();
        res.status(200).json(images);
    } catch (err) {
        res.status(500).json({ error: 'Error fetching images' });
    }
});


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
