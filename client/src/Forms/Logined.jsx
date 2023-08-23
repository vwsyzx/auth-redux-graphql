import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setDefault } from '../api/userSlice/userSlice'

const Logined = () => {
    const dispatch = useDispatch()
    const {user} = useSelector(state => state.userSlice)

    return (
        <div>
            <h3>{user?.emile}</h3>
            <h3>{user?.password}</h3>
            <button onClick={() => dispatch(setDefault())}>Logout</button>
        </div>
    );
}

export default Logined;
