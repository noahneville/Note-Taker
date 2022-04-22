const express = require('express');
const path = require('path');

const PORT = process.env.port || 3001;

const app = express();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));

//GET Route for homepage 
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html')));

app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html')));

app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`));