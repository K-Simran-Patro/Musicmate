const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const app = express();
const port = 3000; // You can change this to any available port

// Enable CORS to allow requests from your frontend
app.use(cors());

// Set up the database connection (replace these values with your database credentials)
const db = mysql.createConnection({
    host: 'localhost',     // Database host
    user: 'root',          // Database user
    password: 'password',  // Database password
    database: 'musicmate'  // Name of your MusicMate database
});

// Connect to the database
db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err);
    } else {
        console.log('Connected to the MusicMate database');
    }
});

// API route to get all users from the user table
app.get('/api/users', (req, res) => {
    const query = 'SELECT username, profile_picture, user_id FROM user'; // Adjust to your actual table structure
    db.query(query, (error, results) => {
        if (error) {
            res.status(500).json({ error: 'Failed to retrieve users' });
        } else {
            res.json(results); // Send the user data to the frontend
        }
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
