// calling required libraries
const express = require('express');
const path = require('path');
const apiRoutes = require('./routes/notes.js')
// const PORT = process.env.port || 3001;
const PORT = process.env.port;

const app = express();

// middleware to parse JSON and urlencoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//GET Route for notes.html page
app.get('/notes', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/notes.html'))
);

// get route for index.html page
app.get('/', (req, res) => 
    res.sendFile(path.join(__dirname, 'public/index.html'))
);

// calling our API routes from notes.js here 
app.use('/api', apiRoutes);

// if the user goes to a URL that doesn't exist, this GET route redirects them to the index page
app.get('*', (req, res) =>
    res.sendFile(path.join(__dirname, 'public/index.html')));

// listener to make the server work 
app.listen(PORT, () => 
console.log(`App listening at http://localhost:${PORT}`));