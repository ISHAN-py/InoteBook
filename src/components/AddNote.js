import React, { useContext , useState} from 'react'
import noteContext from '../context/notes/noteContext'

export default function AddNote(props) {
  const context = useContext(noteContext);
  const {addNote } = context;
  const [note, setNote] = useState({title:"",description:"",tag:""})
  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value});
  };
  const handleClick = ()=>{
    addNote(note.title, note.description, note.tag);
    setNote({title:"",description:"",tag:""});
    props.showAlert("Note Added Successfully", "success")
  };
  return (
    <div className="container my-3 ">
        <h1>Add a note</h1>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input type="text" className="form-control" id="title" name="title" onChange = {onChange}minLength={2} required value = {note.title}/>
        </div>

        <div className="mb-3">
          <label htmlFor="tag" className="form-label">Tag</label>
          <input type="text" className="form-control" id="tag" name="tag" onChange = {onChange}minLength={3} value = {note.tag}/>
        </div>

        <div className="mb-3">
          <label htmlFor="description" className="form-label">Description</label>
          <textarea className="form-control" id="description" name="description" rows="3" onChange = {onChange}minLength={5} required value = {note.description}></textarea>
          <button type = "submit"className=" btn btn-primary my-3" onClick={handleClick} disabled={note.title.length<2 || note.description.length < 5}>Add Note</button>
          </div>
      </div>
  )
}
