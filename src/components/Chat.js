import React,{useState,useEffect} from 'react'
import {useSelector} from 'react-redux'
import firebase from 'firebase'
import {selectUser} from '../features/userSlice'
import {selectGroupId,selectGroupName} from '../features/appSlice'
import db from '../firebase'
import "./chat.css"
import Message from "./Message.js"

import SendIcon from '@material-ui/icons/Send';

function Chat() {
    const user = useSelector(selectUser)
    const groupId = useSelector(selectGroupId)
    const groupName = useSelector(selectGroupName)
    const [input, setInput] = useState("")
    const [messages, setMessages] = useState([])
    const handleChange = (e)=>{
        const msg=e.target.value
        setInput(msg)
    }
    const sendMessage = (e)=>{
        e.preventDefault()
        db.collection("groups")
        .doc(groupId)
        .collection("messages")
        .add({
            message:input,
            user:user,
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
        })
        setInput("")
    }
    useEffect(() => {
        if(groupId){
            db.collection("groups")
            .doc(groupId).collection("messages")
            .orderBy("timestamp","asc")
            .onSnapshot((snap)=>{
                setMessages(snap.docs.map(doc=>doc.data()))
            })
        }
    }, [groupId])
    return (
        <div className="chat">
            {groupId?(
                <>
                <h2>{groupName}</h2>
                <div className="chatMsgs">
                    {messages.map(msg=>
                        <Message 
                            message={msg.message}
                            user={msg.user}
                            timestamp={msg.timestamp}
                        />
                    )}
                </div>
                <form  className="chatInput" onSubmit={sendMessage}>
                    <input type="text" placeholder={`Message @${groupName}`} value={input} onChange={handleChange}/>
                    <button type="submit" onClick={sendMessage}>
                        <h4>Send</h4> <SendIcon/>
                    </button>
                </form>
                </>
            ):<h1 className="chatHome">Select a Group to view messages</h1>}
            
        </div>
    )
}

export default Chat
