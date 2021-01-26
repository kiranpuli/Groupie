import React from 'react'
import {auth,provider} from '../firebase'
import './login.css'
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import Button from '@material-ui/core/Button';

function Login() {

    const signin = ()=>{
        // console.log("signin")
        auth.signInWithPopup(provider).catch(err=>{console.error(err.message)})
    }

    const btn={ 
        fontSize: 120,
        color:"#3f51b5"
    }

    return (
        <div className="login">
            <div className="logo">
                <QuestionAnswerIcon style={btn}/><h1>Groupie</h1>
            </div>
            <Button onClick={signin} variant="contained" color="primary">Sign in with Google</Button>
        </div>
    )
}

export default Login
