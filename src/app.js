const express = require('express');
const todoRoutes = require('./routes/todoRoutes');

const app = express();
app.use(express.json());

// Routes
app.use('/api/todos', todoRoutes);

// 404 Handler
app.use((req, res) => res.status(404).json({ message: 'Route not found' }));

module.exports = app;