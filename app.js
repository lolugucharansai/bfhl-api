const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const USER_ID = 'john_doe_17091999';
const EMAIL = 'john@xyz.com';
const ROLL_NUMBER = 'ABCD123';

// Root endpoint
app.get('/', (req, res) => {
    res.send('Welcome to the BFHL API');
});

// POST endpoint
app.post('/bfhl', (req, res) => {
    try {
        const { data } = req.body;

        if (!Array.isArray(data)) {
            return res.status(400).json({ is_success: false, error: 'Invalid input: data must be an array' });
        }

        const numbers = data.filter(item => !isNaN(item) && item !== '');
        const alphabets = data.filter(item => isNaN(item) && item.length === 1);
        const highestAlphabet = alphabets.length > 0 ? 
            [alphabets.reduce((a, b) => a.toLowerCase() > b.toLowerCase() ? a : b)] : 
            [];

        res.json({
            is_success: true,
            user_id: USER_ID,
            email: EMAIL,
            roll_number: ROLL_NUMBER,
            numbers,
            alphabets,
            highest_alphabet: highestAlphabet
        });
    } catch (error) {
        res.status(500).json({ is_success: false, error: 'Internal server error' });
    }
});

// GET endpoint
app.get('/bfhl', (req, res) => {
    res.status(200).json({ operation_code: 1 });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});