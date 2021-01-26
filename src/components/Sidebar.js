import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import db, { auth } from "../firebase";
import { selectUser } from "../features/userSlice";

import "./sidebar.css";

import GroupLink from "./GroupLink";

import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Avatar from "@material-ui/core/Avatar";

function Sidebar() {
  const user = useSelector(selectUser);
  const [groups, setGroups] = useState([]);

  const logout = () => {
    auth.signOut();
  };

  const btn = {
    color: "#fff",
    border: "#fff",
    borderRadius: "10px",
  };

  const addGroup = () => {
    const groupName = prompt("Enter group name!");
    if (groupName) {
      db.collection("groups").add({
        groupName,
      });
    }
  };

  useEffect(() => {
    db.collection("groups").onSnapshot((snap) => {
      setGroups(
        snap.docs.map((doc) => ({
          id: doc.id,
          group: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <div className="sidebar">
      <div className="sidebarHead">
        <Avatar src={user.photo} />
        <h2>{user.displayName}</h2>
        <Button
          onClick={logout}
          variant="contained"
          color="secondary"
          size="small"
        >
          Logout
        </Button>
      </div>
      <div className="sidebarBody">
        <h3>
          Groups
          <IconButton>
            <AddIcon className="addicon" onClick={addGroup} />
          </IconButton>
        </h3>
        <div className="groupList">
          {groups.map(({ id, group }) => (
            <GroupLink key={id} id={id} groupName={group.groupName} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
