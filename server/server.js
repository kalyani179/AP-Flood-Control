// backend/server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
// mongoose.connect('mongodb://localhost:27017/mydatabase', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// });

app.get('/', (req, res) => {
    res.send('Hello from the backend!');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
