//External Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//App Dependencies
const db = require('../db');
const controller = require('./controllers');

//Router
let router = require('./routes.js');

//Start Server
const app = express();
const PORT = process.env.PORT || 8000;

//Serve client files
app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

app.use('/api', router);

const server = app.listen(PORT, () => {
  console.log('listening on port 8000!');
});

// ---------------------------- SOCKET LOGIC ------------------------------
const io = require('socket.io').listen(server);

io.sockets.on('connection', (socket) => {
  console.log('a user has connected');
  socket.on('subscribe', (room) => {
    console.log('joining room', room);
    socket.join(room);
  });
  socket.on('unsubscribe', (room) => {
    console.log('leaving room', room);
    socket.leave(room);
  });
  socket.on('send', (data) => {
    console.log('received message', data);
    io.sockets.in(data.region).emit('message', data);
    controller.messages.insertNewMessage(data)
    //io.emit('message', data);
  });
});