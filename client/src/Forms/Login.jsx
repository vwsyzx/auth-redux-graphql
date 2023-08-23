import React, { useState } from 'react';
import '../App.css'
import {LOGIN_FUNC} from '../Apollo/UserApollo/userApollo'
import {useMutation} from '@apollo/client'
import { setUser } from '../api/userSlice/userSlice';
import { useDispatch } from 'react-redux';

const Regis = () => {
    const dispatch = useDispatch()
    const [newLoginFunc, {loading, error, data}] = useMutation(LOGIN_FUNC)

    async function LoginFunc(emile, password){
        const {data} = await newLoginFunc({variables: {input: {emile, password}}})

        localStorage.setItem('refresh', data.LoginFunc.token.refresh)
        localStorage.setItem('access', data.LoginFunc.token.access)
        dispatch(setUser(data.LoginFunc.user))
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
                <h2 className='title'>Login</h2>
                <div className='tools'>
                    <input type="text" value={input1} placeholder="Emile" onChange={ev => setInput1(ev.target.value)}/>
                    <input type="password" value={input2} placeholder="Password" onChange={ev => setInput2(ev.target.value)}/>
                    <button onClick={async () => await LoginFunc(input1, input2)}>Apply</button>
                </div>
            </div>
            <div className="result">
                {base}
            </div>
        </div>
    );
}

export default Regis;
