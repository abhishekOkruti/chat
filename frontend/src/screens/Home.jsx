import React, { useEffect } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const { io } = require("socket.io-client");
const Home = () => {
    const socket = io("http://localhost:3001");
  const [newRoom, setNewRoom] = useState("");
  const [roomName, setRoomName] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [message,setMessage]=useState("");
  const [messageList,setMessageList]=useState([]);

  
  const navigate = useNavigate();
useEffect(()=>{
const getData=async()=>{
  await axios.get(`http://localhost:5000/message/recive/${newRoom}`).then((res)=>{setMessageList(res.data)})
}
  if(showChat){
    getData();
}
},[showChat])
  const createRoom = () => {
    if (newRoom !== "") {
      socket.emit("create", newRoom);
      setShowChat(true);
    }
  };
  const joinRoom = () => {
    socket.emit("join", roomName);
    setShowChat(true);
  };
//   useEffect(() => {
//     socket.on("joined", (room) => {
//       navigate(`/rooms/${room}`);
//     });
//   }, [socket,navigate]);
  
  useEffect(() => {
    socket.on("recive", (data) => {
      setMessageList((pre) => [...pre, data]);
    });
  }, [socket]);
  const sendMessage=async()=>{
  if(message!==""){
    const data={
      "room":newRoom,
      "message":message
    }
    await socket.emit("send", data);
 
    await axios.post("http://localhost:5000/message/send",data) 
    setMessage("") ;
   }
  }
 return(
    <>
    {
        messageList && messageList.map((msg,index)=>(
            <h1 key={index}>{msg}</h1>
        ))
    }
    { !showChat && (<><h1>create a room </h1>
      <input
        type="text"
        onChange={(e) => {
          setNewRoom(e.target.value);
        }}
      />
      <button onClick={createRoom}>Create a room</button>
      <h1>or</h1>
      <h1>join a room</h1>
      <input
        type="text"
        onChange={(e) => {
          setRoomName(e.target.value);
        }}
      />
      <button onClick={joinRoom}>join a room</button>
     </>)}
      {
          showChat && (
              <>
              <div>
              <input value={message} type="text" onChange={(e)=>setMessage(e.target.value)} />
              <button onClick={sendMessage}>send</button>
              </div>
              </>
          )
      }
    </>
  );
};

export default Home;
