const path = require('path');
const express = require('express');
const dotenv = require('dotenv').config();
const color = require('colors');
const { errorHandler } = require('./middleware/errorMiddleware');

const connectDB = require('./config/db');
const port = process.env.PORT || 5000;

// Set up MongoDB
connectDB();

// Setting up express
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));
app.use('/api/lectures', require('./routes/lectureRoutes'));
app.use('/api/questionnaires', require('./routes/questionnaireRoutes'));
app.use('/api/questions', require('./routes/questionRoutes'));

// Server frontend

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../', 'frontend', 'build', 'index.html'))
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

// Error handler
app.use(errorHandler);

// Running the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
