const { dummyChannels, dummyUsers, dummyMessages } = require('../dummyData');
const model = require('../models');
const db = require('../../db');
const GOOGLE_API_KEY = 'AIzaSyBSD6qv5TRPXsah-l2DBja5GaGjkeYrmgw';

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
				//queryArgs.push(data.timestamp)
				return model.insertNewMessage(queryArgs)
			})
			.then((messageId) => {
				console.log('Message inserted successfuly', messageId)
			})
			.catch((err) => {
				console.log('Error inserting messages')
			})
		},

		post: () => {

		}
	}, 

	channels: {
		get: (req, res) => {
			console.log('Controller.channels.get', req.params.region)
			let region = req.params.region || 'MissionNoeRegion'
			model.getChannels(region)
			.then((channels) => {
				res.status(200)
				res.json(channels)	
			})
			.catch((err) => {
				res.status(500).send('Error getting channels', err);
			})

		}
	},

	region: {
		get: (req, res) => {
			console.log('Controller.region.get', req.params.region)

		},

		getRegionName: (lat, long) => {
			return new Promise (
				(reject, resolve) => {
					fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`, {
          				method: 'GET'
        			})
        			.then((data) => {
        				console.log(data[0].address_components[0])
        				resolve(data)
        			})
        			.catch((err) => {
        				reject(err)
        			})
				}
			)
		},

		getRegionName: (lat, long) => {
			return new Promise (
				(reject, resolve) => {
					fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`, {
          				method: 'GET'
        			})
        			.then((data) => {
        				console.log(data[0].address_components[0])
        				resolve(data)
        			})
        			.catch((err) => {
        				reject(err)
        			})
				}
			)
		},

		getPolygonCoords: (lat, long) => {
			return new Promise(
				(reject, resolve) => {
					var myExtent = new esri.geometry.Extent(-107,25,-92,36, new esri.SpatialReference({wkid:4326}));  
				}
			)
		}
	},

	users: {
		get: () => {

		},

		put: (req, res) => {
		  	const userLat = req.params.lat;
		  	const userLong = req.params.long;
		  	const radius = req.params.radius || 25;
		  	let userRegionID;
		  	let userRegionName;
		  	console.log('In Users post')
		  	//const userCoord = `ST_SetSRID(ST_MakePoint(${userLat}, ${userLong}),4326)`;
		  	//SELECT ST_Buffer(ST_GeomFromText('LINESTRING(50 50,150 150,150 50)'), 10, 'endcap=round join=round');
		  	//db.query(`SELECT id, name FROM areas WHERE ST_Contains(geom, ${userCoord});`, null, (err, result) => {
		  	//db.query(`SELECT id, name FROM areas WHERE minlong=-122.4127313;`, null, (err, result) => {  
		  	model.findRegion(userLat, userLong)
		  	.then((regions) => {
		  		if (regions.length > 0) {
			      	userRegionID = regions[0].id;
			      	userRegionName = regions[0].name;
			      	console.log('id and name of region user was placed in:', regions[0].name);
			      	//at this point we have the id and name
			      	//update the users table with the id of the region that user is in
			      	//send the name of the region the user was placed in
			      	return model.updateUserRegion(userRegionID)
			    } else {
			    	//Create new region
			    	var queryString = `INSERT INTO regions VALUES (DEFAULT, ${userRegionName}, 
			    	${userLat}, ${userLong}, ${radius}, 
			    	ST_Buffer(ST_GeomFromText('POINT(${userLat} ${userLong})'), ${radius}, 'quad_segs=8'));`
			    	//Get the region name
			    	module.exports.region.getRegionName(userLat, userLong)
			    	.then((response) => {
			    		console.log(JSON.parse(response.results[0].address_components[0]))
			    		userRegionName = response
			    		return model.insertNewRegion(queryString)
			    	})
			    	.then((regionId) => {
			    		console.log('region added successfully')
			    		userRegionID = regionId
			    		return model.updateUserRegion(userRegionID) 
			    	})
			    	.catch((err) => {
			    		console.log(err)
			    		res.sendStatus(500);
			    	})
			    }
		  	})
		  	.then((data) => {
		  		console.log('successfully updated user');
			    res.status(201).send(`${userRegionName}`);
		  	})
		  	.catch((err) => {
		  		console.log('err updating the user record', err);
			    res.sendStatus(500);
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
