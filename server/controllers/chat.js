// all users
const users = [];

const addUser = username => {
    users.push(username);
    return username;
}


const chat = io => {
    io.on('connection', socket => {

        //send username
        io.emit('connected', socket.id);

        //get the username
        socket.on('username', (username) => {
            //add user to list of active users
            addUser({username:username});
            // emit all users
            io.emit('users', users);
            //notification to other users that user has been joined
            socket.broadcast.emit('user joined', `${username} joined`);
            // io.emit('user joined', `${username} joined`);
        })



        // let users = [];
        
        // for(let [id, socket] of io.of('/').sockets) {
        //     const existingUser = users.find((u) => {
        //         u.username === socket.username;
        //         users.push({username: socket.username});
        //     })
        // }

        socket.emit('users', users);




        //listen for the message and emit to everyone
        socket.on('message', message => {
            io.emit('message', message);
        })

        //disconnect
        socket.on('disconnect', () => {
            console.log('user disconnected')
        })
    })
};

export default chat;