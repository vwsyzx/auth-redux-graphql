import { useEffect, useState } from 'react'
import Regis from './Forms/Regis'
import Login from './Forms/Login'
import Logined from './Forms/Logined'
import './App.css'
import { useSelector, useDispatch } from 'react-redux'
import {REFRESH_FUNC} from './Apollo/UserApollo/userApollo'
import { useLazyQuery } from '@apollo/client'
import {setDefault, setUser} from './api/userSlice/userSlice'

function App() {
  const dispatch = useDispatch()
  const {auth} = useSelector(state => state.userSlice)

  const [newRefreshFunc, {loading, error}] = useLazyQuery(REFRESH_FUNC) 

  const [mood, setMood] = useState(0)
  const [enable, setEnable] = useState(false)

  async function RefreshFunc(refresh){
    try{
      const {data} = await newRefreshFunc({variables: {input: {refresh}}})
      localStorage.setItem('refresh', data.RefreshFunc.token.refresh)
      localStorage.setItem('access', data.RefreshFunc.token.access)
      dispatch(setUser(data.RefreshFunc.user))
    }
    catch(error){
      dispatch(setDefault())
    }
  } 

  useEffect(() => {
    if(localStorage.getItem('refresh') && localStorage.getItem('access')){
      (async function(){
        await RefreshFunc(localStorage.getItem('refresh'))
      })()
    }
    setEnable(true)
  }, [])

  if(loading){
    return <div className='mainCss'>
      <h3>Loading!</h3>
    </div>
  }
  else if(auth){
    return <div className='mainCss'>
      <Logined/>
    </div>
  }
  else if(!auth && enable){
    return <div className='mainCss'>
      <button onClick={() => setMood(12345)}>Regis</button>
      <button onClick={() => setMood(23456)}>Login</button>
      {mood===12345?<Regis/>:mood === 23456?<Login/>:null}
    </div>
  }
}

export default App
