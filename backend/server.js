// server.js
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const formRoutes = require('./routes/formRoutes');

const app = express();

// Enable CORS middleware
app.use(cors());

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb+srv://pratikpetkar:pratik123@cluster0.5qcwvyc.mongodb.net/?retryWrites=true&w=majority'
).then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});

// Routes
app.use('/api/formdata', formRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
