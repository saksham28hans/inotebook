import React, {useContext,useState} from 'react';
import notesContext from '../context/notes/notesContext';

const AddNote = (props) => {
    const context = useContext(notesContext);
    const { addNote } = context;

    const [note, setnote] = useState({title:"",description: "",tag:""});
    const handleClick = (e)=>{
       
        addNote(note.title,note.description,note.tag);
        setnote({title:"",description: "",tag:""});
        props.showAlert("Note Added Successfully","success");
        e.preventDefault();
    }

    const onChange = (e)=>
    {
        setnote({...note, [e.target.name]:e.target.value})
    }
  return (
    <div>
      <h2>Add a Note</h2>
            <form>
                <div className="mb-3 my-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name="title" onChange={onChange} value={note.title} />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name="description" onChange={onChange} value={note.description}/>
                </div>
                <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag}/>
                </div>
                <button disabled ={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-primary " onClick={handleClick}>Add a Note</button>
            </form>
    </div>
  );
}

export default AddNote;
