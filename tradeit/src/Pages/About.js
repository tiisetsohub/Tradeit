import React, { useContext } from 'react';
import { NameContext, LoginContext } from '../Context'

export default function About(){
    const { name, setName } = useContext(NameContext)
    const {login, setLogin} = useContext(LoginContext)
    return (
        <div>
            {login ? <h1>hi there {name}</h1> : <h1>Get outta here brah</h1>}
            <button onClick={()=>setLogin(!login)}>click me</button>
        </div>
    )
}