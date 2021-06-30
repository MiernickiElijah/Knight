const express = require('express');
const fs = require('fs');
const path = require('path');

// ROUTING
module.exports = (app) => {
    fs.readFile("./db/db.json", 'utf8', (err, data) => {
        if (err) {
            console.error(err)
            return (res.status(404))
        }
        console.log(data);
    });

    // API GET Requests
    app.get('/api/notes', (req, res) => {
        res.json(notes);
    });

    // API POST Requests
    app.post('/api/notes', (req, res) => {
        let newNote = req.body;
        notes.push(newNote);
        updateDB();
        return console.log("Note Added!")
    });

    //GET note by ID
    app.get("/api/notes/:id", (req, res) => {
        res.json(notes[req.paras.id]);
    });

    //DELETE note by ID
    app.get("/api/notes/:id", (req, res) => {
        notes.splice(req.params.id, 1);
        updateDB();
        console.log("Note Deleted!")
    });
};