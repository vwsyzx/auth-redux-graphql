import React, { useState } from 'react';
import '../App.css'
import {useMutation} from '@apollo/client'
import { REGIS_FUNC } from '../Apollo/UserApollo/userApollo'

const Regis = () => {

    const [newRegisFunc, {error, data, loading}] = useMutation(REGIS_FUNC)

    async function RegisFunc(emile, password){
        const {data} = await newRegisFunc({variables: {input: {emile, password}}})
    }

    const [input1, setInput1] = useState('')
    const [input2, setInput2] = useState('')

    let base

    if(loading){
        base = <>
            <h3>Loading!</h3> 
        </>
    }
    if(error){
        base = <>
            {error && <h3>{error.data.message}</h3>}
        </>
    }
    if(data){
        base = <>
            <h3>Successfuly Registered!</h3>
        </>
    }
    return (
        <div className='cover-1'>
            <div className='cover-2'>
                <h2 className='title'>Registration</h2>
                <div className='tools'>
                    <input type="text" value={input1} placeholder="Emile" onChange={ev => setInput1(ev.target.value)}/>
                    <input type="password" value={input2} placeholder="Password" onChange={ev => setInput2(ev.target.value)}/>
                    <button onClick={async () => await RegisFunc(input1, input2)}>Apply</button>
                </div>
            </div>
            <div className="result">
                {base}
            </div>
        </div>
    );
}

export default Regis;
