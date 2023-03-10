const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;
const fs = require('fs');
const idGenerator = require('./utils/idGenerator');

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});
app.get('/api/notes', (req, res) => {
    fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
        if (err) throw err;
        res.json(JSON.parse(data));
    });
});

// post request to add a note
app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a note`);
    //destructure the body of the request
    const { title, text } = req.body;
    if (title && text) {
        newNote = {
            title,
            text,
            id: idGenerator(),
        };
        // read the db.json file and add the new note to the array
        fs.readFile(path.join(__dirname, 'db/db.json'), 'utf8', (err, data) => {
            if (err) throw err;
            notes = JSON.parse(data);
            notes.push(newNote);
            // write the new array to the db.json file
            fs.writeFile('./db/db.json', JSON.stringify(notes, null, 2), (writeErr) =>
                writeErr
                    ? console.error(writeErr)
                    : console.info('Success! Saved Note to db.json')
            );
        });
        res.status(201).json(newNote);
    } else {
        res.status(400).json({ error: 'Please provide a title and text for your note.' });
    }
});
//garbage collection
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});


app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});


