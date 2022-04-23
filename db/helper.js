/* This is a helper file that contains functions used to make API routes simpler. 
Initially, I couldn't get my API routes to work in my server.js file where I declared them, 
so my tutor helped me modularize my app by making a routes folder and making this helper file to make things simpler. 
It imports the fs, util and nanoid npms to read and write from the db.json using promises
and uses nanoid to generate unique uuids that are assigned to each note when saved.  */
const fs = require('fs');
const util = require('util');
const { nanoid } = require('nanoid')
// using util to promisify the read and write file methods in fs
const readDB = util.promisify(fs.readFile);
const writeDB = util.promisify(fs.writeFile);

// a class containing all functions for easier exporting
class Helper {
// functions that use the read/writeDB methods above to write to the db.json file in the /db/ directory
    read() {return readDB('db/db.json', 'utf-8');}
    write(note){ return writeDB('db/db.json', JSON.stringify(note))};

// uses read function to read db, converts the results to a javascript object and assigns them to an array
    getNotes() {
        return this.read().then((notes) => {
            let parsedDB;
            try{
                parsedDB = [].concat(JSON.parse(notes))
            }
            catch (err) {
                parsedDB = [];
            }
            return parsedDB;
        })
    }
// function used to save to database
    writeNote(note) {
        // destructures the note object passed in
        const {title, text} = note;
        // use nanoid to generate a unique id
        const id = nanoid();
        // create a new object with id included
        const newNote = {title, text, id};
        // uses the getNotes function to read the database,put it in an array with the new note and rewrite the database with the results
        return this.getNotes()
            .then(notes => [...notes, newNote])
            .then(updatedNotes => this.write(updatedNotes))
            .then(() => newNote);
    }
}

// export for use in API routes file
module.exports = new Helper();