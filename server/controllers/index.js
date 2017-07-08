const { dummyChannels, dummyUsers, dummyMessages } = require('../dummyData');
const model = require('../models');
const db = require('../../db');
const request = require('request');

let googleKey;
if (process.env.GOOGLE_API_KEY === undefined) {
	googleKey = require('./googleKey');
}
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY || googleKey;

module.exports = {
	messages: {
		get: (req, res) => {
			console.log(`receiving the initial GET request with coords ${req.params.lat}, ${req.params.long}`);
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
				return model.getRegionId(data.region)
			})
			.then((regionId) => {
				queryArgs.push(regionId)
				return model.getChannelId(data.channel, regionId)
			})
			.then((channelId) => {
				queryArgs.push(channelId)
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
	}, 

	channels: {
		get: (req, res) => {
			let region = req.params.region || 'MissionNoeRegion'
			model.getChannels(region)
			.then((channels) => {
				res.status(200)
				res.json(channels)	
			})
			.catch((err) => {
				res.status(500).send('Error getting channels', err);
			})

		},

		put: (req, res) => {
			let regionName = req.params.region || 'MissionNoeRegion'
			let newChannel = req.params.newChannel
			model.getRegionId(regionName)
			.then ((regionId) => {
				return model.addChannel(regionId, newChannel)
			})
			.then((channel) => {
				console.log('New Channel added succesfully', channel)
	    		res.status(201).send(JSON.stringify(channel))
	    	})
	    	.catch((err) => {
	    		console.log('Err in adding channel', err)
	    		if (err.code === '23505') {
	    			res.sendStatus(406)
	    		} else {
	    			res.sendStatus(500);
	    		}
	    	})
		}
	},

	regions: {
		get: (req, res) => {
			model.findRegion(req.params.lat, req.params.lng)
			.then((regions) => {
				res.status(200)
				res.json(regions)
			})
			.catch((err) => {
				res.status(500).send('Error getting channels', err);	
			})

		},

		put: (req, res) => {
			console.log('reached')
			var userRegionName = ''
			var userLat = req.params.lat
			var userLong = req.params.lng
			var radius = req.params.radius
			module.exports.regions.getRegionName(userLat, userLong)
	    	.then((response) => {
	    		userRegionName = response
	    		return model.insertNewRegion(userRegionName, userLat, userLong, radius)
	    	})
	    	.then((regionId) => {
	    		userRegionID = regionId
	    		return model.insertStdChannels(userRegionID)
	    	})
	    	.then((channels) => {
	    		res.status(201).send(JSON.stringify(userRegionID));
	    	})
	    	.catch((err) => {
	    		console.log('Err in adding region', typeof err.code)
	    		if (err.code === '23505') {
	    			res.sendStatus(406)
	    		} else {
	    			res.sendStatus(500);
	    		}
	    	})
		},

		getRegionName: (lat, long) => {
			return new Promise (
				(resolve, reject) => {
					request.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GOOGLE_API_KEY}`, (err, response, body) => {
						if (err) {
							reject(err)
						} else {
							var info = `${JSON.parse(body).results[0].address_components[0].long_name} ${JSON.parse(body).results[0].address_components[1].long_name} ${JSON.parse(body).results[0].address_components[2].long_name}`
							console.log('In getRegionName', info)
        					resolve(info)
						}
        			})
				}
			)
		},

		updateUserRegion: (userRegionName, userRegionID, userLat, userLong) => {
			console.log('In updateUserRegion')
			return new Promise (
				(resolve, reject) => {
					model.updateUserRegion(userRegionID, userLat, userLong)
					.then((data) => {
				  		console.log('successfully updated user');
				  		var temp = {
				  			region: userRegionName,
				  			lat: userLat,
				  			lng: userLong
				  		}
				  		console.log('sending userdata', temp)
					    //res.status(201).send(JSON.stringify(temp));
					    resolve(temp)
				  	})
				  	.catch((err) => {
				  		console.log('err updating the user record', err);
					    reject(err)
				  	});
				}
			)
		},

		addNewRegion: (userRegionName, userLat, userLong, radius) => {
			return new Promise (
				(resolve, reject) => {
					module.exports.regions.getRegionName(userLat, userLong)
			    	.then((response) => {
			    		console.log('In regions', response)
			    		userRegionName = response
			    		return model.insertNewRegion(userRegionName, userLat, userLong, radius)
			    	})
			    	.then((regionId) => {
	    				userRegionID = regionId
	    				return model.insertStdChannels(userRegionID)
	    			})
			    	.then((channels) => {
			    		console.log('region added successfully', channels)
			    		return module.exports.regions.updateUserRegion(userRegionName, userRegionID, userLat, userLong)
			    	})
			    	.then((data) => {
			    		resolve(data)
			    	})
			    	.catch((err) => {
			    		console.log(err)
			    		reject(err);
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
		put: (req, res) => {
		  	const userLat = req.params.lat;
		  	const userLong = req.params.long;
		  	const radius = req.params.radius || 2;
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
			      	module.exports.regions.updateUserRegion(userRegionName, userRegionID, userLat, userLong)
			      	.then((data) => {
			      		res.status(201).send(JSON.stringify(data));
			      	})
			    } else {
			    	//Create new region
			    	//Get the region name
			    	module.exports.regions.addNewRegion(userRegionName, userLat, userLong, radius)
			    	.then((data) => {
			    		res.status(201).send(JSON.stringify(data));
			    	})
			    	.catch((err) => {
			    		console.log(err)
			    		res.sendStatus(500);
			    	})
			    }
		  	})
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
			      		res.status(201).send('username already taken');
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
