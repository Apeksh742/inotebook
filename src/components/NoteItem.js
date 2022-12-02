import React, { useContext, useState } from 'react'
import AlertContext from '../contexts/alert/AlertContext';
import NoteContext from '../contexts/notes/NoteContext'

export default function NoteItem(props) {
    const { title, description, _id, tag } = props.note
    const noteContext = useContext(NoteContext);
    const alertContext=useContext(AlertContext)
    const { deleteNote } = noteContext;
    const handleDelete=async(_id)=>{
        await deleteNote(_id);
        alertContext.showAlert("Note deleted", "success","success")
    }

    return (
        <>
        <div className="noteItem col-md-4 col-sm-6 my-2 d-flex align-items-stretch">
                <div className="card">
                    <div className="card-body d-flex flex-column justify-content-between">
                        <div>
                            <h5 className="card-title">{title}</h5>
                            <p className="card-text">{description}</p>
                        </div>
                        <div className="cardfooter mt-2">
                            <span data-bs-toggle="modal" data-bs-target="#editNoteModal">
                            <i className="fa-regular fa-pen-to-square" data-bs-toggle="tooltip" data-bs-placement="top" title="Edit" onClick={
                                ()=>{
                                 props.setEditNote(props.note)
                                }
                            }></i>
                        </span>
                        <i className="fa-regular fa-trash-can mx-3" data-bs-toggle="tooltip" data-bs-placement="top" title="Delete" onClick={
                            () => { handleDelete(_id)  }
                        }></i>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}
