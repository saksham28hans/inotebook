const express = require('express');
const fetchUser = require('../middleware/fetchuser');
const router = express.Router();
//Include express validator
const { body, validationResult } = require('express-validator');
//Include User model
const Notes = require('../models/Notes');

//Route 1 : Fetch all notes using GET "/api/notes/fetchallnotes". Login Required
router.get('/fetchallnotes', fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ userId: req.user.id })
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Interval server error" });
    }

})

//Route 2 : Add a Note using POST "/api/notes/addnote". Login Required
router.post('/addnote', [
    body('title').isLength({ min: 3 }),
    body('description').isLength({ min: 5 })
], fetchUser, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, description, tag } = req.body;
    try {
        const note = new Notes({
            title, description, tag, userId: req.user.id
        })
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Interval server error" });
    }
})

//Route 3 : Update a Note using PUT "/api/notes/updatenote/:id". Login Required
router.put('/updatenote/:id', fetchUser, async (req, res) => {

    const { title, description, tag } = req.body;
    try {
        const newNote = {};
        if (title) { newNote.title = title }
        if (description) { newNote.description = description }
        if (description) { newNote.tag = tag }
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }
        note = await Notes.findByIdAndUpdate(req.params.id, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Interval server error" });
    }
})

//Route 4 : Update a Note using Delete "/api/notes/deletenote/:id". Login Required

router.delete('/deletenote/:id', fetchUser, async (req, res) => {

    try {
        let note = await Notes.findById(req.params.id);
        if (!note) {
            return res.status(404).send("Not Found");
        }

        if (note.userId.toString() !== req.user.id) {
            return res.status(401).send("Not Allowed");
        }

        note = await Notes.findByIdAndDelete(req.params.id);
        res.json({ message: "Successfully Deleted", note: { note } });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Interval server error" });
    }
})
module.exports = router;