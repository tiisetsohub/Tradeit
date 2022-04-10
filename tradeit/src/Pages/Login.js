import React from 'react';
import { loginmethod } from '../firebase-config';
import { useState, useEffect, useRef } from 'react';
import Sellers from './Sellers'
import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom';
import './Login.css';
let move = false;


export default function Login() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  
  
  async function handleLogin() {
    console.log(move)
    setLoading(true);
    try {
      await loginmethod(emailRef.current.value, passwordRef.current.value);
      move = true;
    } catch {
      alert('Error!')
    }
    setLoading(false);
    console.log(move)
    
    return move;
  }

  
  
    
  
  
  return (
    <div className="bigdiv">
      {
        move ? <Redirect to='/landing' />
        : null
      }
      <Navbar />
      <h1>Login</h1>
      <div className='logindiv'>
        <input className="edtemail" id ="input" ref = {emailRef} placeholder="Email"/>
        <br />
        <input type="password" className="edtpassword" id="input" ref={passwordRef} placeholder="Password"/>
        <div className="btnsdiv">
          <Link to="/signup">
            <button disabled={loading} className="btnsignup" id="btn">Sign Up</button>
          </Link>
            <button disabled={loading} className="btnlogin" id="btn" onClick={handleLogin}>Login</button>
        </div>
      </div>
      
    </div>
  )
}

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <div className="navbar">
      <div className="leftside">
        <div className="links" id={showLinks ? "hidden" : ""}>
          <Link className="navlink" to='/'>
            <p>Home</p>
          </Link>
          <Link className="navlink" to='/login'>
            <p>About</p>
          </Link>
          <Link className="navlink" to='/login'>
            <p>Contact</p>
          </Link>
        </div>
        <button onClick={() => setShowLinks(!showLinks)}>
          ≡
        </button>
      </div>
    </div>
  )
}
