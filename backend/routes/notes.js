const express = require('express');
const Router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser');
const Note = require('../models/Notes.js')


//Route 1 get all the notes 
Router.get('/fetchallnotes',fetchuser,async (req,res)=>{
  const notes = await Note.find({user:req.user.id});
  res.json(notes)
}) 


//Route 2 add a new note using post /addnote
Router.post('/addnote',fetchuser,[
  body('title', 'enter a valid title').isLength({ min: 2 }), 
  body('description', 'The description should be atleast 5 characters').isLength({ min: 5 })
],async (req,res)=>{
  const {title,description,tag} = req.body;
  //Checking Errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() })
  }
  try {
    const note=new Note({
      title,description,tag,user:req.user.id
    })
    const savedNote = await note.save()
    res.send(savedNote)
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
}) 


//Route 3 update an existing note /updatente authorization required 
Router.put('/updatenote/:id',fetchuser,async (req,res)=>{
  const {title,description,tag} = req.body;
  try {
    //Create a New Note Object
    const newnote = {};
    if(title){newnote.title = title}
    if(description){newnote.description = description}
    if(tag){newnote.tag = tag}
    //Find the note to be updated
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString()!== req.user.id){return res.status(401).send("What u doin boi ?")}
    note = await Note.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.send(note);
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})


//Route 4 Deleting a Note authention required using delete /deletenote
Router.delete('/deletenote/:id',fetchuser,async (req,res)=>{
  try {
    //Find the note to be updated
    let note = await Note.findById(req.params.id)
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString()!== req.user.id){return res.status(401).send("What u doin boi ?")}
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"Success":"Note Deleted Successfully", note:note})
  } catch (error) {
    console.log(error.message)
    res.status(500).send("Internal Server Error")
  }
})
module.exports = Router; 