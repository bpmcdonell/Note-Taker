const express = require('express');
const app = express();
const path = require('path');
const PORT = process.env.PORT || 3001;


app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
    });
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
    });

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
    });
