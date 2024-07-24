const express = require('express');
const path = require('path');
const fs = require('fs');

const db = require('./db/db.json');
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


    res.json(db);
    
});

app.post(`/api/notes`, (req,res)=>{
    console.info(`${req.method} request received to save a note.`);
    let id = Math.floor((1 + Math.random()) * 0x10000);
    const {title, text } = req.body;

    if (title && text){
        const newNote = {
            id: id,
            title,
            text
        }
        db.push(newNote);
        fs.writeFile('./db/db.json',JSON.stringify(db),(err) =>
            err ? console.error(err) : console.log('File creation was successful!')
        );
        return res.status(200).send('Note saved successfully');
    }
});

app.delete(`/api/notes/:id`, (req,res)=>{
    debugger;
    console.info(`${req.method} request received to delete a note with id#${req.params.id}.`);
    const targetId = parseInt(req.params.id);
  
        const updatedDB = db.filter(note=>note.id !== targetId);
        fs.writeFile('./db/db.json',JSON.stringify(updatedDB),(err) =>
            err ? console.error(err) : console.log('Note deletion was successful!')
        );

        const response ={
            status: 'success',
            body: updatedDB
        };
        
        res.json(response);
});

app.listen(PORT, ()=>{
    console.log(`Listening at http://localhost:${PORT}`)
})