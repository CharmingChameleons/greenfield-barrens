//External Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//App Dependencies
const db = require('../db');
const controller = require('./controllers');

//auth
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')
const cookieParser = require('cookie-parser')
const config = require('./oauth.config.js');


//Router
let router = require('./routes.js');

//Start Server
const app = express();
const PORT = process.env.PORT || 8000;



const server = app.listen(PORT, () => {
  console.log('listening on port 8000!');
});


passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(null, id);
});

app.use(cookieParser());

app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


passport.use(new FacebookStrategy({
    clientID: config.facebook.clientID,
    clientSecret: config.facebook.clientSecret,
    callbackURL: config.facebook.callbackURL
  },
  function(accessToken, refreshToken, profile, done) {
    done(null, {
    accessToken: accessToken,
    profile: profile
  });
    // User.findOrCreate(..., function(err, user) {
    //   if (err) { return done(err); }
    //   done(null, user);
    // });
  }
));

app.use(express.static(__dirname + '/../client/dist'));
app.use(cors());

app.use('/api', router);


// login LOGIC
app.get('/login', function(req, res, next) {
  res.send('Go back and register!');
});

app.get('/auth/facebook', passport.authenticate('facebook'));

app.get('/auth/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function(req, res) {
    // Successful authentication
    res.json(req.user);
});

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/logintest.html');
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
