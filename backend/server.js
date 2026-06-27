const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Basic route
app.get('/', (req, res) => {
  res.send('MERN Portfolio Backend is running!');
});

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (uri) {
    mongoose.connect(uri)
      .then(() => console.log('MongoDB database connection established successfully'))
      .catch(err => console.log('MongoDB connection error: ', err));
} else {
    console.log('No MONGODB_URI provided. Skipping database connection.');
}

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
