// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const ImageObject = require('./models/ImageObject'); // Import the model for 'imageObject'

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB (imagebase database)
mongoose.connect('mongodb+srv://ap-flood:ap-flood-password@ap-flood.kqxk7.mongodb.net/imagebase?retryWrites=true&w=majority&appName=ap-flood', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected to imagebase'))
.catch(err => console.error('MongoDB connection error:', err));

// Endpoint to fetch data from 'imageObject' collection
app.get('/data', async (req, res) => {
    try {
        const data = await ImageObject.find({}); // Use the ImageObject model to query the collection
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
