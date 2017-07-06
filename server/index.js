const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const db = require('../db');
const controller = require('./controllers');

const { dummyChannels, dummyUsers, dummyMessages } = require('./dummyData');

const app = express();

const PORT = process.env.PORT || 8000;

const server = app.listen(PORT, () => {
  console.log('listening on port 8000!');
});

const io = require('socket.io').listen(server);

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

//Router
const router = require('./routes.js');

app.use('/api', router);

// app.get('/', (req, res) => {
//   res.send('server is responding to different paths');
// });

// app.get('/api/messages/:lat/:long', (req, res) => {
//   // figure out which region we're looking in
//   //retrieve all messages that have been tagged with that region
//   //retrieve all messages tagged with general'
//   console.log(`receiving the initial GET request with coords ${req.params.lat}, ${req.params.long}`);
//   //retrieve all messages tagged with the region corresponding to incoming coords
//   res.json(dummyMessages);
// });

// app.get('/api/:lat/:long/:channel', (req, res) => {
//   //
// });


// likely no posting messages route -- everything will happen in the socket
// ---------------------------- SOCKET LOGIC ------------------------------

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