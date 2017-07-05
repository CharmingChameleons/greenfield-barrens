var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes

//Landing page (No user login)
router.get('/', controller.messages.get);

//Landing page post with Login
router.get('/api/messages/:lat/:long', controller.messages.get);

//Get messages for GeoLocation
router.get('/api/users', controller.users.get);

//Post messages to GeoLocation
router.post('/api/users', controller.users.post);

module.exports = router;
