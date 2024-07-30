const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
const db = process.env.MONGO_URI;
mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.get('/', (req, res) => res.send('API is running...'));

// Start the server
const PORT = process.env.PORT || 5001; // Change to 5001 or any other available port
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
