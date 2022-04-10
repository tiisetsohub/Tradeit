import React from 'react'
import { signupmethod } from '../firebase-config'
import { db } from '../firebase-config'
import { collection, getDocs, addDoc } from "firebase/firestore"
import { useState, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Switch, Route, Link,Redirect } from 'react-router-dom';
import './Login.css';
let move = false;


export default function Signup() {
  const [newName, setNewName] = useState("");
  const [newSeller, setNewSeller] = useState(false);
  const [newEmail, setNewEmail] = useState("");
  const [newCell, setNewCell] = useState("");
  const [users, setUsers] = useState([]);
  const userRef = collection(db, "Users");

  const [loading, setLoading] = useState(false);
  const emailRef = useRef();
  const passwordRef = useRef();
  
  async function handleSignup(){
    setLoading(true);
    try {
      await signupmethod(emailRef.current.value, passwordRef.current.value);
      await addDoc(userRef, { Name: newName, Seller : newSeller, Email: newEmail, Cell: newCell });
      move = true;
    } catch {
      alert('Error!')
    }
    setLoading(false);
    return move;
  }

  useEffect(() => {
    const getUsers = async () => {
      const data = await getDocs(userRef);
      setUsers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }

    getUsers()
  }, []);

  return (
    <div className="bigdiv">
      {
        move ? <Redirect to='/landing' />
          : null
      }
      <Navbar />
      <h1>Sign up</h1>
      <div className='logindiv'>
        <input className="edtname" id="input" placeholder="Name" onChange={(event) => {
          setNewName(event.target.value)
        }}/>
        <br />
        <input className="edtcell" id="input" placeholder="Cell" onChange={(event) => {
          setNewCell(event.target.value)
        }}/>
        <br />
        <input ref={emailRef} className="edtemail" id="input" placeholder="Email" onChange={(event) => {
          setNewEmail(event.target.value)
        }}/>
        <br />
        <input ref={passwordRef} type="password" className="edtpassword" id="input" placeholder="Password" />
        <br />
        <text className = "txt">Check if you'd like to register as a seller </text>
        <input className="chbsell" type="checkbox" placeholder="Seller" onChange={(event) => {
          setNewSeller(!newSeller)
        }}/>
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

