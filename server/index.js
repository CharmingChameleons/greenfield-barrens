//External Dependencies
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

//App Dependencies
const db = require('./models/index.js');
const controller = require('./controllers');

//auth
const passport = require('passport')
const FacebookStrategy = require('passport-facebook').Strategy
const session = require('express-session')
const cookieParser = require('cookie-parser')
// const config = require('./oauth.config.js');


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
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.FB_CALLBACK
  },
  function(accessToken, refreshToken, profile, done) {

    db.checkOrMakeUser(profile.id, profile.displayName)
    .catch((err) => {
      console.log('user probably not user! (this should never happen)', err);
    })
    .then((data) => {
      console.log(data);
      done(null, {
        accessToken: accessToken,
        profile: profile,
        id: data
      });
    })
    .catch((err) => {
      console.log('user insert failed', err);
      done(err,null);
    })


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
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' }));

app.get('/logout', function(req, res){
  console.log('logging out');
  req.logout();
  res.redirect('/');
});

app.get('/usertest', function(req, res){
  console.log(req.user);
  if(req.user) {
    const username = req.user.profile.displayName;
    res.send(username);
  }
  res.send();
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
