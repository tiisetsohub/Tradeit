import React, { useContext } from 'react';
import { useState, useEffect } from 'react';
import { db } from '../firebase-config';
import { collection, getDocs, addDoc } from "firebase/firestore";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import './Home.css';
import { CartContext } from '../Context'

//identical to home.js


export default function Landing(){
    const [cartitems, setCartItems] = useState([])
    const [show, setShow] = useState(false);
    const [text, setText] = useState("hey");
    const [Inventory, setItems] = useState([]);
    const itemRef = collection(db, "Inventory");
    const { cart, setCart } = useContext(CartContext)

    
    function Navbar() {
        const [total, setTotal] = useState(0);
        const [showLinks, setShowLinks] = useState(false);
        const [showcart, setShowCart] = useState(false);
        const [summary, setSummary] = useState("")
        let t = 0

        function CartView() {
            
            setShowCart(!showcart)
            setSummary(
                cartitems.map(function (currentValue, index, array) {
                    return index >= 0 ? <div className="cartitemdiv">
                        <div className="cartleft">
                            <img src={currentValue.Image} className="pic" />
                        </div>
                        <div className="cartright">
                            <h6 className="cartid">{currentValue.Name}</h6>
                            <h6 className="cartpricep">R{currentValue.Price}</h6>
                        </div>
                    </div> : null
                })
            )

            for (let i = 0; i < cartitems.length; i++) {
                const element = cartitems[i];
                t+=element.Price
                
            }
            t=t.toFixed(2)
            
            setTotal(t)

        }
        return (
            <div>
                <div className="navbar">
                    <div className="leftside">
                        <div className="links" id={showLinks ? "hidden" : ""}>
                            <Link className="navlink" to='/sell'>
                                <p>Sell</p>
                            </Link>
                            <Link className="navlink" to='/about'>
                                <p>About</p>
                            </Link>
                            <Link className="navlink" to='/login'>
                                <p>Contact</p>
                            </Link>
                            <Link className="navlink" onClick={() => {
                                CartView()
                            }}>
                                <p>Cart</p>
                            </Link>
                        </div>
                        <button onClick={() => setShowLinks(!showLinks)} className="btnthings">
                            ???
                        </button>
                    </div>
                    <div className="rightside">
                        <input className="edtsearch" placeholder="Search" />
                        <button className="btnsearch">
                            Search
                        </button>
                    </div>

                </div>
                {
                    showcart ? <div className="cartdiv">
                        {summary}
                        <div className="demodiv">
                            <text className='textin'>R{total}</text>
                            <button className='buttonin'>Check out</button>
                        </div>
                    </div> : null
                }
            </div>
        )
    }


    useEffect(() => {
        const getItems = async () => {
            const data = await getDocs(itemRef);
            setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        }

        getItems()
    }, []);

    function handleCartItems(item){
        setCartItems(prev => {
            return cartitems.includes(item) ? prev : [...prev, item];
        })
        
        alert('Item added to cart');
        
    }

    useEffect(() => {
        setCart(cartitems)
    },[cartitems])


    function ProductView(item) {
        setShow(true)
        setText(
            <div>
                <button className="btnclose" onClick={() => setShow(false)}>X</button>
                <img src={item.Image} />
                <h3>{item.Name}</h3>
                <p>{item.Description}</p>
                <p>{item.Price}</p>
                <div>
                    <input 
                    type="number" 
                    className="edtnum" 
                    placeholder="1" 
                    min='1' 
                    max={item.Quantity} 
                    />
                    <button className="btnadd" onClick={()=>handleCartItems(item)}>Add to cart</button>
                </div>
            </div>
        )
    }

    return (
        <div>
            <Navbar />
            {
                show ? <div className="reviewdiv">
                    {text}
                </div> : 
                    <div className="bodydiv" >
                        {Inventory.map((item) => {
                            return <div className="itemdiv" onClick={() => {
                                ProductView(item)
                            }}>
                                <img src={item.Image} alt="nope" />
                                <div className="textdiv">
                                    <h1 className="itemname">{item.Name}</h1>
                                </div>
                                <h1 className="itemprice">R{item.Price}</h1>
                            </div>
                        })}
                    </div>
            }
            
        </div>
    );

}
