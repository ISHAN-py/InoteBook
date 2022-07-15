import React, { useContext, useEffect, useRef , useState} from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './NoteItem';
import {useNavigate} from 'react-router-dom';
import AddNote from './AddNote'

export default function Notes(props) {
  const context = useContext(noteContext);
  const {editNote } = context;
  const [note, setNote] = useState({id : "",etitle:"",edescription:"",etag:""})
  const { notes, getNotes } = context;
  const ref = useRef(null)
  const refClose = useRef(null)
  const navigate = useNavigate();
  const handleClick = ()=>{
    editNote(note.id,note.etitle,note.edescription,note.etag)
    ref.current.click()
    props.showAlert("Note Updated Successfully", "success")
  }
  const onChange = (e)=>{
    setNote({...note,[e.target.name]:e.target.value});
    
  };
  const updatenote = (currentnote) => {
    ref.current.click()
    setNote({id:currentnote._id,etitle:currentnote.title, edescription:currentnote.description , etag:currentnote.tag})
    
  }
  useEffect(() => {
    if(localStorage.getItem('authToken')!=null){
      getNotes();
    }
    else{
      navigate('/login');
    }
    // eslint-disable-next-line
  }, [])
  return (
    <>
      <AddNote showAlert = {props.showAlert}/>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <div className="container my3">
                <h1>Update a Note</h1>
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" value = {note.etitle}name="etitle" onChange={onChange} minLength={2} required/>
                </div>

                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value = {note.etag} onChange={onChange} minLength = {3}/>
                </div>

                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">Description</label>
                  <textarea className="form-control" id="edescription" name="edescription" rows="3" value = {note.edescription} onChange={onChange}minLength={5} required></textarea>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button ref = {refClose}type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled = {note.etitle.length <2 || note.edescription.length <5} type="button" onClick = {handleClick}className="btn btn-primary" >Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3 my-3">
        <h1>Your Notes-</h1>
        <h4><i>{notes.length === 0 && "No Notes To Display" }</i></h4>
        {notes.map((note) => {
          return <Noteitem key={note._id} updatenote={updatenote} note={note} showAlert = {props.showAlert}/>;
        })}
      </div>
    </>
  )
}
