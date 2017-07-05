//External Dependencies
const express = require('express');

// Middleware
const bodyParser = require('body-parser'),
      cors = require('cors');

//App Dependencies
const db = require('../db');

//Router
let router = require('./routes.js');

//Start Server
const app = express();
const PORT = process.env.PORT || 8000;

//Serve client files
app.use(express.static(__dirname + '/../client/dist'));

app.use(cors());

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
    //need to get the id corresponding to a user, the id corresponding to the channel name, and the id corresponding to the area
    db.query(`INSERT INTO messages VALUES (DEFAULT, null, '${data.text}', 1, 0, 0, 1, null, null);`, null, (err, results) => {
      if (err) {
        console.log('err inserting into messages', err);
      } else {
        console.log('success inserting into messages');
      }
    });
    // io.emit('message', data);
  });
});
