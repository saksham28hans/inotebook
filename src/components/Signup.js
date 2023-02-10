import React, {useState,useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/Alert/alertContext';

const Signup = () => {

    const alcontext = useContext(alertContext);
    const { showAlert } = alcontext;
    const [credentials, setcredentials] = useState({name:"",email:"",password:"",cpassword:""});
    const navigate = useNavigate();
    const onChange = (e)=>
    {
        setcredentials({...credentials, [e.target.name]:e.target.value})
    }
    const handleClick = async (e)=>{
        e.preventDefault();
        const {name,email,password,cpassword} = credentials;
        if(password !== cpassword)
        {
            showAlert('Password does matches. Try Again','danger');
        }
        else
        {
        //API Call to add a note
        const response = await fetch(`http://localhost:5000/api/auth/create`, {
          method: 'POST',          
          headers: {
            'Content-Type': 'application/json',
          },
          
          body: JSON.stringify({name,email,password}) // body data type must match "Content-Type" header
        });
        const json = await response.json(); // parses JSON response into native JavaScript objects
        console.log(json);
        if(json.success)
        {
         showAlert('Account Created Sucessfully','success');
         localStorage.setItem('token',json.authToken);
         navigate("/");
        }
        else
        {
            showAlert(json.error,'danger');
        }
        }
    }
  return (
    <div className='container my-5'>
      <form onSubmit={handleClick}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" name="name" value={credentials.name} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>        
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" name="email" value={credentials.email} onChange={onChange} aria-describedby="emailHelp" required/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" name="password" value={credentials.password} onChange={onChange} minLength={5} required/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" id="cpassword" name="cpassword" value={credentials.cpassword} onChange={onChange} minLength={5} required/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  );
}

export default Signup;
