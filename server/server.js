// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const DashboardData = require('./models/DashboardData'); // Import the model

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://dantulurikalyani999:gQOrNigXOpa5PtYF@cluster0.uabah.mongodb.net/Dashboard', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

// Endpoint to fetch data
app.get('/data', async (req, res) => {
    try {
        const data = await DashboardData.find({});
        res.json(data);
    } catch (err) {
        res.status(500).send(err);
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


