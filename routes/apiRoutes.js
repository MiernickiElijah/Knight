const router = require('express').Router();
const fs = require('fs');
const path = require('path');
const { v4: genId } = require('uuid')
let notesData;

// ROUTING
fs.readFile("./db/db.json", 'utf8', (err, data) => {
    if (err) {
        console.error(err)
        return (res.status(404))
    }
    notesData = JSON.parse(data);
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

//GET note by ID
router.get("/notes/:id", (req, res) => {
    res.json('notes', notes[req.params.id - 1]);
});

// API POST Requests
router.post('/notes', (req, res) => {
    let pastNote = req.body;
    const { title, text } = pastNote;
    const note = { title, text, id: genId() };
    notesData.push(note);
    console.log(note, "Note Added!");
    fs.writeFileSync("./db/db.json", JSON.stringify(notesData),
        (err) => {
            if (err)
                console.log(err);
        });
    res.statusCode = 200;
    res.send("yay");
});

//DELETE note by ID
router.delete("/notes/:id", (req, res) => {
    notesData.splice(req.params.id, 1);
    res.statusCode = 204;
    res.send("nevermore");
});

module.exports = router;