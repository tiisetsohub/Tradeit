import React from "react";
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import Login from './Login';




export default function Home() {

    const [Inventory, setItems] = useState([]);
    const itemRef = collection(db, "Inventory");


    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
    }, []);

    return (
        <div>
            <Navbar />
            <div className="bodydiv">
                {Inventory.map((item) => {
                    return <div className="itemdiv">
                        <img src={item.Image} alt="nope" />
                        <div className="textdiv">
                            <h1 className="itemname">{item.Name}</h1>
                        </div>
                        <h1 className="itemprice">R{item.Price}</h1>
                    </div>
                })}
            </div>
        </div>
    );

}

function Navbar(){
    const [showLinks, setShowLinks] = useState(false);
    return (
        <div className="navbar">
            <div className="leftside">
                <div className="links" id = {showLinks ? "hidden" : ""}>
                    <Link className="navlink" to='/login'>
                        <p>Login/Signup</p>
                    </Link>
                    <Link className="navlink" to='/login'>
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
            <div className="rightside"> 
                <input className="edtsearch" placeholder="Search"/>
                <button className="btnsearch">
                    Search
                </button>
            </div>
        </div>
    )
}

