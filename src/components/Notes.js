import React, { useEffect, useState } from 'react'
import NoteItem from './NoteItem'
import { useContext } from 'react'
import NoteContext from '../contexts/notes/NoteContext'
import { useNavigate } from 'react-router-dom';
import AlertContext from '../contexts/alert/AlertContext';
export default function Notes() {
  const notesContext=useContext(NoteContext);
  const alertContext=useContext(AlertContext)
  const { notes, fetchAllNotes, updateNote }=notesContext
  const {showAlert}=alertContext
  const navigate=useNavigate()
  const fetchUsernotes=async()=>{
    if(!await fetchAllNotes())
      navigate('/login')
  }
  useEffect(() =>{
    document.title="iNotebook - Your Notes"
    fetchUsernotes()
  },[])
  const [editNote, setEditNote] = useState({title:"",description:"",tag: ""  })
  const onChange = (e) => {
    setEditNote({
      ...editNote, [e.target.name]: e.target.value
    })
  }
  const handleUpdateClick = async()=>{
    
    await updateNote(editNote)
    showAlert("Note updated", "success","success")
  }
  return (
      <>
      <div className="modal fade" id="editNoteModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control modal-input" id="title" name='title' value={editNote.title} minLength={5} required aria-describedby="emailHelp" onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <textarea type="textArea" rows="5" className="form-control modal-input" id="description" name='description' value={editNote.description} minLength={5} required onChange={onChange} />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control modal-input" id="title" name='tag' value={editNote.tag} minLength={3} aria-describedby="emailHelp" onChange={onChange} />
                </div>

              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={()=>{
                handleUpdateClick()
              }}>Save changes</button>
            </div>
          </div>
        </div>
      </div>
      {notes.length===0 && 'No notes to display'}
      <div className="row">
          {
              notes.map((note) => {
                  return <NoteItem note={note} key={note._id} setEditNote={setEditNote} />
              })
          }

      </div>
    </>
  )
}
