import React, { useContext, useState } from 'react'
import AlertContext from '../contexts/alert/AlertContext'
import NoteContext from '../contexts/notes/NoteContext'

export default function AddNote() {
  const notesContext=useContext(NoteContext)
  const alertContext=useContext(AlertContext)
  const [newNote,setNewNote]=useState({title:"",description:"",tag:""})
  const {showAlert}=alertContext
  const handleSubmit=(e)=>{
    e.preventDefault(); 
    notesContext.addNote(newNote)
    showAlert("Note Added", "success","success")
  }
  const onChange=(e)=>{
    setNewNote({
        ...newNote,[e.target.name]:e.target.value
    })
  }
  return (
    <form className="my-3" onSubmit={handleSubmit}>
          <h3 className='mb-1'>Add a Note</h3>
          <div className="mb-3 add-note">
              <label htmlFor="title" className="form-label">Title</label>
              <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp" minLength={5} required onChange={onChange} /> 
          </div>
          <div className="mb-1 add-note">
              <label htmlFor="description" className="form-label">Description</label>
        <textarea type="textArea" rows="5" className="form-control" id="description" name='description' minLength={5} required onChange={onChange} />
          </div>
      <div className="mb-2 add-note">
        <label htmlFor="title" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag" name='tag' aria-describedby="emailHelp" minLength={3} onChange={onChange} />
      </div>
          <button type="submit" className="btn btn-primary">Add</button>
      </form>
  )
}
