import './App.css';
import Navbar from './components/Navbar';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alerts from './components/Alert';
import Signup from './components/Signup';
import Login from './components/Login';
import { useState } from 'react';
function App() {
  const [alert, setAlert] = useState(null)
  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);
  }
  const toggleMode = () => {
    if (mode === 'dark') {
      setMode('light')
      document.body.style.backgroundColor = 'white'
      document.body.style.color = 'black'
      showAlert('Light Mode Has Been Enabled', 'success')
    }
    else {
      setMode('dark')
      document.body.style.backgroundColor = 'rgb(70, 69, 69)'
      document.body.style.color = '#f5f5f5'
      showAlert('Dark Mode Has Been Enabled', 'success')
    }
  }
  const [mode, setMode] = useState('light')
  return (
    <>
      <NoteState>
        <Router>
          <Navbar mode={mode} toggleMode={toggleMode} />
          <Alerts alert={alert}/>
          <div className="container">
          <Routes>
            <Route path="/" element={<Home showAlert = {showAlert} mode={mode}/>}/>
            <Route exact path="/about" element={<About mode={mode}/>}/>
            <Route exact path="/login" element={<Login showAlert = {showAlert} mode={mode}/>} />
            <Route exact path="/signup" element={<Signup showAlert = {showAlert} mode={mode}/>}/>
          </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
