const express = require('express');
const path = require('path');
const db = require('./db/db.json');
const fs = require('fs');
const PORT = 3001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app. use(express.static('public'));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get(`/notes`, (req,res)=>{
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get(`/api/notes`, (req, res)=>{
    console.info(`${req.method} request received to get notes.`);

    return res.json(db);
});
app.post(`/api/notes`);
app.delete(`/api/notes/:id`);

app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})