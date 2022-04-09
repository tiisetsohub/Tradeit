import React from 'react'
import { signupmethod } from '../firebase-config'
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Login.css';

export default function Signup() {
  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  
  async function handleSignup(){
    setLoading(true);
    try {
      await signupmethod(emailRef.current.value, passwordRef.current.value);
    } catch {
      alert('Error!')
    }
    setLoading(false);
  }
  return (
    <div>
      <Navbar />
      <div className='logindiv'>
        <input ref ={emailRef} className="edtemail" id="input" />
        <br />
        <input ref={passwordRef} type="password" className="edtpassword" id="input" />
        <br />
        <button disabled={loading} className="btnlogin" id="btn" onClick={handleSignup}>Sign up</button>
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

