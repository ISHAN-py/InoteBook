import React ,{useContext}from 'react'
import noteContext from '../context/notes/noteContext'

export default function NoteItem(props) {
  const context = useContext(noteContext);
  const {deleteNote} = context;
  const myStyles = {
    color:"black"
  }
  return (
    <div className="col-md-3 my-3 ">
      <div className="card" style={myStyles}>
        <div className="card-body">
          <div className="d-flex align-items-center">
            <h5 className="card-title">{props.note.title}</h5>
            <i className="fa-solid fa-trash-can mx-3" onClick = {()=>{deleteNote(props.note._id);props.showAlert("Note Deleted Successfully", "success")}}></i>
            <i className="fa-solid fa-pen-to-square " onClick = {()=>{props.updatenote(props.note)}}></i>
          </div>
          <p className="card-text">{props.note.description}</p>
        </div>
      </div>
    </div>
  )
}
