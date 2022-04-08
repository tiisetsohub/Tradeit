import React from "react";
import { useState, useEffect } from 'react';
import { db } from '../firebase-config'
import { collection, getDocs, addDoc } from "firebase/firestore"


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
            {Inventory.map((item) => {
                return <div>
                    <h1>NAME: {item.Name}</h1>
                    <h1>desc: {item.Description}</h1>
                    <h1>price: {item.Price}</h1>
                    <h1>quantity: {item.Quantity}</h1>
                </div>
            })}
        </div>
    );

}