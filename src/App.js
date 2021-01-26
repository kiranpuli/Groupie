import React,{useEffect} from 'react';
import {useSelector,useDispatch} from 'react-redux'
import {auth} from "./firebase"
import './App.css';
import Login from './components/Login'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'

import {selectUser,login,logout} from "./features/userSlice"


function App() {
  const dispatch = useDispatch();
  const user = useSelector(selectUser)

  useEffect(() => {
    auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        dispatch(
          login({
            uid:authUser.uid,
            photo:authUser.photoURL,
            email:authUser.email,
            displayName:authUser.displayName
          })
        )
      }else{
        dispatch(logout());
      }
    })
  }, [dispatch]);

  return (
    <div className="App">
      {
        user ? (
          <>
          <Sidebar/>
          <Chat/>
          </>
        ):(
          <Login/>
        )
      }
    </div>
  );
}

export default App;
