const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const uuidv1 = require('uuidv1')
let notesData;

// ROUTING
fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return (res.status(404))
    }
    notesData = JSON.parse(data);
    console.log(notesData);
});

// API GET Requests
router.get('/notes', (req, res) => {
    if (res) {
        res.json(notesData);
    }
    else (err) => {
        console.error(err)
        return (res.status(500))
    }
});

// API POST Requests
router.post('/notes', (req, res) => {
    let pastNote = req.body;
    notesData.push(pastNote);
    const { title, text } = pastNote;
    const note = { title, text, id: uuidv1() };
    console.log(note, "Note Added!");
    return fs.writeFileSync("./db/db.json", JSON.stringify(notesData),
        (err) => {
            if (err)
                console.log(err);
        });
});

//GET note by ID
router.get("/api/notes/:id", (req, res) => {
    res.json(notes[req.params.id]);
});

// //DELETE note by ID
router.get("/api/notes/:id", (req, res) => {
    notes.splice(req.params.id, 1);
    updateDB();
    console.log("Note Deleted!")
});

module.exports = router;