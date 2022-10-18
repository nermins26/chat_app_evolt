import { useState, useEffect } from "react";
import socket from "./socket";
import Join from "./components/Join";
import Chat from "./components/Chat";


function App() {

  //state
  const [username, setUsername] = useState('');
  const [connected, setConnected] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {

    //set the username
    socket.on('connected', id => {
      setUsername(id);
      setConnected(true)
    })

    //get the message
    socket.on('message', message => {
      setMessages(previousMessages => [...previousMessages, message]);
    })


    //get the notification
    socket.on('user joined', msg => {
      console.log('user joined message', msg);
    });
 
    return () => {
      socket.off('user joined');
      socket.off('message');
    };

  }, []);


  useEffect(() => {
    //get all users
    socket.on('users', users => {
      console.log(users)
      setUsers(users);
    })

    //if user leaves or if there is any update on socket, run this
    return () => {
      socket.off('users');
    };

  }, [socket])


  //on join btn click
  const joinChat = () => {
    document.querySelector('#join').style.display = 'none'
    document.querySelector('#chat').style.display = 'block';
    socket.emit('username', username);

  }

  // sending message
  const handleMessage = e => {
    e.preventDefault();
    socket.emit('message', `${username} - ${message}`);
    //set message back to empty
    setMessage("");
  }

  const allMessages = messages.map((msg, index) => {
    return (
      <div className="alert alert-secondary" key={index}>
        {msg}
      </div>
    )
  })

  const allUsers = users.map(u => {
    return (
      <div className="alert alert-primary" key={u.username}>
        {u.username}
      </div>
    )
  })

  return (
    <div className="container">
      <div className="row">
        <Join joinChat={joinChat} username={username}/>
        <Chat handleMessage={handleMessage} message={message} setMessage={setMessage} />
      </div>
      {connected ? (
        <div className="row">
          <div className="col-8">
            {allMessages}
          </div>
          <div className="col-4">
            {allUsers}
          </div>
        </div>
      ) : ""}
      
    </div>
  );
}


export default App;
