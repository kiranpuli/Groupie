import React from 'react'
import "./chat.css"
import { Avatar } from '@material-ui/core'

function Message({user,message,timestamp}) {
    return (
        <div className="msg">
            <Avatar src={user.photo}/>
            <div className="msgContent">
                <h5>
                    {user.displayName}
                    <span className="msgTimestamp">
                        {new Date(timestamp?.toDate()).toUTCString()}
                    </span>
                </h5>
                <p>{message}</p>
            </div>
        </div>
    )
}

export default Message
