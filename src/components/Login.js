import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom';


export default function Login(props) {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" })
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //redirect ansd save the auth token 
      localStorage.setItem('authToken', json.authToken);
      console.log(localStorage.getItem('authToken'))
      navigate('/');
      props.showAlert("Logged-In successfully", "success")
    }
    else{
      props.showAlert("Invalid credentials", "danger")
    }
  }
  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };
  return (
    <>
    <div className="mt-3">
    <h2>Login to continue to InotebooK</h2>
    </div>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" value={credentials.email} name="email" aria-describedby="emailHelp" onChange={onChange} />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" value={credentials.password} name="password" id="password" onChange={onChange} />
        </div>
        <button type="submit" className="btn btn-primary" >Login</button>
      </form>
    </>
  )
}
