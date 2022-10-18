import {io} from 'socket.io-client';

//server
const URL = 'http://localhost:8000';

//socket connecction
const socket = io(URL, {
    //config
    path: '/socket.io',
    reconnection: false
});

export default socket;