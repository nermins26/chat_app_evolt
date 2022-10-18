import express from 'express';
import chat from './controllers/chat';
require('dotenv').config();

// app
const app = express();
//http instance
const http = require('http').createServer(app);

//socket io config
const io = require('socket.io')(http, {
    path: '/socket.io',
    cors: {
        origin: ['http://localhost:3000'],
        methods: ["GET", "POST"],
        allowedHeaders: ["content-type"]
    }
});

//middlewares
app.use(express.json({limit: "5mb"}));
app.use(express.urlencoded({extended: true}));

//rest api
app.get('/api', (req,res) => {
    res.send('Test from server');
});

// socket
chat(io);

const port = process.env.PORT || 8000;
http.listen(port, () => {
    console.log(`Server running on port ${port}`);
})
