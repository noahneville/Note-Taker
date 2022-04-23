/* Initially I couldn't get my API routes to work. My tutor helped me fix them and also had me create this folder 
to put them in instead of the server.js file. I couldn't get DELETE to work without deleting all of the notes, hopefully
i'll have time to go back and get it working soon. 
*/

//importing necessary external modules. notes uses the express Router method, helper is our helper file created in db.
const notes = require('express').Router();
const helper = require('../db/helper')

// GET route using getNotes function from helper file. 
notes.get('/notes', (req, res) => {
    
    helper.getNotes().then((notes) => {
        res.json(notes)
    })
    .catch((err) => {
        res.status(500).json(err)
    })
});

// POST route using writeNote function created in helper file. 
notes.post('/notes', (req, res) => {
    console.log('POST request received from browser.')

    helper.writeNote(req.body)
    .then((note) => {
        res.json(note)
    })
});


module.exports = notes;