// Imports
import React, { useState } from "react";
import NoteContext from "./noteContext";

//Main
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const initialNotes = []
  const [notes, setNotes] = useState(initialNotes)

  //Get all notes
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"}
    });
    const json_1 = await response.json();
    console.log(json_1)
    setNotes(json_1);}

  //Add a note
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        "auth-token": localStorage.getItem('authToken'),
        "Content-Type": "application/json"},
      body: JSON.stringify({ title, description, tag })
    });
    let note = await response.json();
    setNotes(notes.concat(note));}

  // Delete a note 
  const deleteNote = async (note_id) => {
    const response = await fetch(`${host}/api/notes/deletenote/${note_id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authToken')},
    });
    const json_1 = await response.json();
    console.log(json_1)
    console.log("Delete a note with title " + note_id)
    const newNotes = notes.filter((note) => { return note._id !== note_id });
    setNotes(newNotes)}

  // Edit a note 
  const editNote = async (note_id, title, description, tag) => {
    const response = await fetch(`${host}/api/notes/updatenote/${note_id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        "auth-token": localStorage.getItem('authToken')
      },
      body: JSON.stringify({ title, description, tag })
    });
    const json_1 = await response.json();
    console.log(json_1);
    let newNote = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < notes.length; index++) {
      const element = newNote[index];
      if (element._id === note_id) {
        newNote[index].title = title;
        newNote[index].tag = tag;
        newNote[index].description = description;
        break;}}
    setNotes(newNote)}


//Render function
  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;