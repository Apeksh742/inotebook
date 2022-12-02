const express = require('express')
const router = express.Router()
const fetchUserData= require('../middleWare/fetchUserData');
const Note= require('../models/Note');
const { body, validationResult } = require('express-validator');

router.get('/getUserNotes',fetchUserData,async (req, res) => {
    if (req.user) {
        const userId=req.user.id;
        const notes=await Note.find({userId})
        res.json({notes,success:true});
    }
    else{
        res.status(401).json({msg:"Please authenticate using a valid token",success:false});
    }
})

router.post('/addNote',fetchUserData, [
    body('title', 'Title cannot be empty').isLength({ min: 1 }),
    body('description', 'Description cannot be empty').isLength({ min: 3 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array(),success:false });
    }
    else {
        try {
            const { title, description, tag } = req.body;
            const note = await new Note({
                userId: req.user.id,
                title,
                description,
                tag: tag ? tag : "General"
            })
            const savedNote = await note.save();
            res.json({savedNote, success:true});
            
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ msg: "Internal Server Error", success: false });
        }
    }
})

router.put('/updateNote/:id',fetchUserData, async (req, res) => {
    try{
        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(404).json({ msg: "Note not found", success: false });
        }
        
        if (note.userId.toString() !== req.user.id) {
            res.status(401).json({ msg: "Authentication error", success: false });
        }
        const { title, description, tag } = req.body
        const updateNote= {};
        if (title) updateNote.title = title
        if (description) updateNote.description = description
        if (tag) updateNote.tag = tag
        const returnNote = await Note.findByIdAndUpdate(req.params.id, updateNote,{new: true})
        res.json({returnNote, success:true});
    }
    catch(error){
        console.log(error.message);
        res.status(500).json({ msg: "Internal Server Error", success: false });
    }

})

router.delete('/deleteNote/:id',fetchUserData,async(req,res)=>{
    try {
        let note = await Note.findById(req.params.id)
        if (!note) {
            res.status(404).json({msg:"Note not found",success:false});
        }

        if (note.userId.toString() !== req.user.id) {
            res.status(401).json({msg:"Authentication error",success:false});
        }
        const returnNote = await Note.findByIdAndDelete(req.params.id)
        res.json({
            'message':"Note deleted succesfully",
            note,
            success:true
        });
    }
    catch (error) {
        console.log(error.message);
        res.status(500).json({msg:"Internal Server Error", success:false});
    }
})

module.exports = router
