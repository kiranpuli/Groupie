import React from 'react'
import {useDispatch} from 'react-redux'
import {setGroup} from '../features/appSlice'
import "./sidebar.css"

function GroupLink({id,groupName}) {
    const dispatch = useDispatch()
    return (
        <div className="groupLink" onClick={()=>{dispatch(setGroup({
            groupId:id,
            groupName:groupName
        }))}}>
            <h4>{groupName}</h4>
        </div>
    )
}

export default GroupLink
