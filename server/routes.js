var controller = require('./controllers');
var router = require('express').Router();

//Connect controller methods to their corresponding routes

//Landing page (No user login)
router.get('/', controller.messages.get);

//Landing page post with Login
router.get('/messages/:lat/:long', controller.messages.get);

//Get messages for GeoLocation
router.get('/messages/:area', controller.messages.getRoomMessages);

//Post messages to GeoLocation
router.post('/users/:newUsername', controller.users.post);

//Post messages to GeoLocation
router.put('/users/:username/:lat/:long', controller.users.put);

router.get('/region/:lat/:long', controller.region.get);

router.get(':lat/:long/:channel', controller.channel.get);

module.exports = router;
