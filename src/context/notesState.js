import { useState } from "react";
import notesContext from "./notes/notesContext";

const NotesState = (props) => {
    const host = "http://localhost:5000";
    const notesInitial = [];
    const [notes, setnotes] = useState(notesInitial);


    //Add a Note
    const addNote = async (title,description,tag)=>{
        console.log("Adding a Note");
     //API Call to add a note
     const response = await fetch(`${host}/api/notes/addnote`, {
        method: 'POST',          
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        
        body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
      });
      const note = await response.json(); // parses JSON response into native JavaScript objects
      //console.log(json);
     setnotes(notes.concat(note));
    }

    //Delete a Note
    const deleteNote = async (id)=>{
    //API Call to delete a note
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
        method: 'DELETE',          
        headers: {
          'Content-Type': 'application/json',
          'auth-token' : localStorage.getItem('token')
        },
        
       // body: JSON.stringify() // body data type must match "Content-Type" header
      });
      const json = await response.json(); // parses JSON response into native JavaScript objects
    const newNotes = notes.filter((note)=>{return note._id !== id});
    setnotes(newNotes);
    }

    //Update a Note
    const editNote = async (id,title,description,tag)=>{
        //API Call to edit note
        console.log(id);
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT',          
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            
            body: JSON.stringify({title,description,tag}) // body data type must match "Content-Type" header
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
        const newNotes = await JSON.parse(JSON.stringify(notes));
        for(let index =0;index<newNotes.length;index++)
        {
            if(newNotes[index]._id === id)
            {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setnotes(newNotes);

    }

       //GetNotes a Note
       const getNotes = async ()=>{
        //API Call to delete a note
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET',          
            headers: {
              'Content-Type': 'application/json',
              'auth-token' : localStorage.getItem('token')
            },
            
           // body: JSON.stringify() // body data type must match "Content-Type" header
          });
          const json = await response.json(); // parses JSON response into native JavaScript objects
          console.log(json);
        //const newNotes = notes.filter((note)=>{return note._id !== id});
        setnotes(json);
        }

    return (
        <notesContext.Provider value={{ notes, addNote,deleteNote,editNote,getNotes}}>
            {props.children}
        </notesContext.Provider>
    )


}

export default NotesState;