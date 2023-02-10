import { useContext } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NotesState from './context/notesState';
//import Alert from './components/Alert';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import AlertState from './context/Alert/alertState';
  

function App() {
  
  return (
    <>
    <AlertState>
    <NotesState>
    <Router>
    <Navbar/>
    <Alert/>
    <div className="container">
    <Routes>
      <Route exact path ='/' element={<Home/>}/>
      <Route exact path ='/about' element = {<About/>}/>
      <Route exact path ='/login' element = {<Login/>}/>
      <Route exact path ='/signup' element = {<Signup/>}/>
    </Routes>
    </div>
    </Router>
    </NotesState>
    </AlertState>
    </>
  );
}

export default App;
