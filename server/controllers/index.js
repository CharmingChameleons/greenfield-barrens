const { dummyChannels, dummyUsers, dummyMessages } = require('../dummyData');
const model = require('../models');
const db = require('../../db');

module.exports = {
	messages: {
		get: (req, res) => {
			// figure out which region we're looking in
  			//retrieve all messages that have been tagged with that region
  			//retrieve all messages tagged with general'
  			console.log(`receiving the initial GET request with coords ${req.params.lat}, ${req.params.long}`);
  			//retrieve all messages tagged with the region corresponding to incoming coords
  			//res.json(dummyMessages);
		},

		getRoomMessages: (req, res) => {
			console.log(req.params)
			model.getAllMessages(req.params.area)
			.then((messages) => {
				console.log(messages)
				res.status(200)
				res.json(messages)
			})
		},

		insertNewMessage: (data) => {
			var queryArgs = [];
			//need to get the id corresponding to a user, the id corresponding to the channel name, and the id corresponding to the area
			model.getUserId(data.username)
			.then((userId) => {
				console.log('UserId in getUserId', userId)
				queryArgs.push(userId)
				queryArgs.push(data.text)
				return model.getChannelId(data.channel)
			})
			.then((channelId) => {
				queryArgs.push(channelId)
				return model.getRegionId(data.region)
			})
			.then((regionId) => {
				queryArgs.push(regionId)
				return model.insertNewMessage(queryArgs)
			})
			.then((messageId) => {
				console.log('Message inserted successfuly', messageId)
			})
			.catch((err) => {
				console.log('Error inserting messages')
			})
		    // db.query(`INSERT INTO messages VALUES (DEFAULT, null, '${data.text}', 1, 0, 0, 1, null, null);`, null, (err, results) => {
		    //   if (err) {	
		    //     console.log('err inserting into messages', err);
		    //   } else {
		    //     console.log('success inserting into messages');
		    //   }
		    // });
		},

		post: () => {

		}
	}, 

	channel: {
		get: (req, res) => {

		}
	},

	region: {
		get: (req, res) => {

		}
	},

	users: {
		get: () => {

		},

		put: (req, res) => {
		  	const userLat = req.params.lat;
		  	const userLong = req.params.long;
		  	console.log('n Users post')
		  	const userCoord = `ST_SetSRID(ST_MakePoint(${userLat}, ${userLong}),4326)`;
		  	//db.query(`SELECT id, name FROM areas WHERE ST_Contains(geom, ${userCoord});`, null, (err, result) => {
		  	db.query(`SELECT id, name FROM areas WHERE minlong=-122.4127313;`, null, (err, result) => {  
			    if (err) {
			    	console.log('err executing ST_Contains:', err);
			      	res.sendStatus(500);
			    } else {
			      	const userRegionID = result.rows[0].id;
			      	const userRegionName = result.rows[0].name;
			      	console.log('id and name of region user was placed in:', result.rows[0].name);
			      	//at this point we have the id and name
			      	//update the users table with the id of the region that user is in
			      	//send the name of the region the user was placed in
			      	db.query(`UPDATE users SET area=${userRegionID}`, null, (err, result) => {
			        	if (err) {
			        		console.log('err updating the user record', err);
			        		res.sendStatus(500);
			        	} else {
			        		console.log('successfully updated user');
			        		res.status(201).send(`${userRegionName}`);
			        	}
			      	});
			    }
			});
		},

		post: (req, res) => {
			  	const newUsername = req.params.newUsername;
			  	db.query('SELECT username from users;', null, (err, results) => {
			    	if (err) {
			      		console.log('err retrieving messages from the db', err);
			      		res.status(500).send('Error retrieving messages');
			    	}
			    	const usernames = results.rows.map(rowObj => rowObj.username);
			    	if (usernames.includes(newUsername)) {
			      		res.status(406).send('username already taken');
			    	} else {
			      		db.query(`INSERT INTO users VALUES (DEFAULT, '${newUsername}', null, null);`, null, (err, resultsOfInsertion) => {
			        		if (err) {
			          			console.log('err inserting into db', err);
			          			res.status(500).send('Error inserting into db');
			        		}
			        		console.log('successfully inserted into users', resultsOfInsertion);
			        		res.status(201).send('successfully inserted into users');
			      		});
			    	}
			  	});
		}
	}

}
