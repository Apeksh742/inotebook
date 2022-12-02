import { useState } from "react";
import NoteContext from "./NoteContext";
const NoteState = (props) => {
    const HOST ="http://localhost:5000"
    
    const [notes, setNotes] = useState([])
    const addNote=async (note)=>{
        try {
            const header = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            let response = await fetch(`${HOST}/api/notes/addNote`, {
                method: 'POST',
                headers: header,
                body:JSON.stringify(note)
            })
            let data=await response.json();
            let savedNote=data.savedNote;
            setNotes(notes.concat(savedNote))
            console.log("Note added succesfully")
        }
        catch (err) {
            console.log(err)
            console.log("Note added failed")
        }
    }
    const updateNote=async (note)=>{
        try{
            const header = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            let {title,description,tag}=note;
            let response = await fetch(`${HOST}/api/notes/updateNote/${note._id}`, {
                method: "PUT",
                body: JSON.stringify({
                    title,description,tag
                }),
                headers: header
            });
            response=await response.json();
            setNotes(notes.map((element) =>{
                if(element._id===note._id){
                    element = response.returnNote;
                }
                return element
            }));
            console.log("Note updated succesfully")
        } catch(err){
            console.log(err)
            console.log("Notes updation Failed")
        }
    }
    const deleteNote=async (noteId)=>{
        try {
            const header = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            await fetch(`${HOST}/api/notes/deleteNote/${noteId}`, {
                method: 'DELETE',
                headers: header
            })
            setNotes(notes.filter((note) => note._id !== noteId))
            console.log("Note deleted succesfully")
        }
        catch (err) {
            console.log(err)
            console.log("Notes deletion Failed")
        
        }
        
    }
    const fetchAllNotes=async()=>{
        try{
            const header = {
                'Content-Type': 'application/json',
                'auth-token': localStorage.getItem('token')
            }
            let response = await fetch(`${HOST}/api/notes/getUserNotes`, {
                method: 'GET',
                headers: header
            })
            response = await response.json()
            if(response.success){
                setNotes(response.notes);
                console.log("Note fetched succesfully")
                return true;
            } else{
                throw new Error("Notes fetching Failed")
            }
        }
        catch(err){
            console.log(err)
            return false;
        }
    }
    
    return (
        <NoteContext.Provider value={{ notes, addNote, deleteNote, fetchAllNotes, updateNote }} >
            {props.children}
        </NoteContext.Provider>
    );
}
export default NoteState