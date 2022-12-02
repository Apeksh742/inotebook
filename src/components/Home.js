import {React, useContext} from 'react'
import AddNote from './AddNote'
import Notes from './Notes'



export default function Home() {
    return (
        
        <div className="home conatainer">
            <h1 className='text-center pt-2'>Welcome to iNotebook</h1>
            <div className="container ">
                <AddNote/>
                <h3>Your Notes</h3>
                <Notes></Notes>
            </div>
            
        </div>

    )
}
