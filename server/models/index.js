
const db = require('../../db');

module.exports = {
	getAllMessages: (region) => {
		return new Promise (
			(resolve, reject) => {
				// var queryString = `SELECT users.username AS username, regions.name AS region, 
				// 				   channels.name AS channel, messages.content AS text, 
				// 				   messages.stamp AS timestamp
				// 	FROM messages 
				// 	INNER JOIN regions ON messages.regions = regions.id
				// 	LEFT OUTER JOIN channels ON messages.channels = channels.id
				// 	LEFT OUTER JOIN users ON messages.username = users.id
				// 	WHERE regions.name = '${region}';`

				var queryString = `SELECT users.username AS username, regions.name AS region, 
				  channels.name AS channel, messages.content AS text, 
				  messages.stamp AS timestamp
					FROM messages
	 				INNER JOIN regions ON messages.regions = regions.id
					LEFT OUTER JOIN channels ON messages.channels = channels.id
					LEFT OUTER JOIN users ON messages.username = users.id`
				db.query(queryString, null, (err, messages) => {
					if (err) {
          	console.log('err retrieving into db', err);
          	reject(err)
	        } else {
	        	//console.log('successfully retrieving messages from message table', JSON.parse(JSON.stringify(messages.rows)));
	        	resolve(JSON.parse(JSON.stringify(messages.rows)));
					}
			});
		})
	},

	getUserId: (username) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT users.id from users WHERE username = '${username}';`
				db.query(queryString, null, (err, messages) => {
					if (err) {
			          	console.log('err retrieving userid from db', err);
			          	reject(err)
			        } else {
			        	console.log('successfully retrieving userid', JSON.parse(JSON.stringify(messages.rows)));
			        	resolve(parseInt((JSON.parse(JSON.stringify(messages.rows)))[0].id));
					}
			});
		})
	},

	getChannelId: (channel, region) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT id from channels WHERE name = '${channel}' AND region = ${region};`
				db.query(queryString, null, (err, channels) => {
					if (err) {
			          	console.log('err retrieving channelid from db', err);
			          	reject(err)
			        } else {
			        	console.log('successfully retrieving channelid', JSON.parse(JSON.stringify(channels.rows)));
			        	resolve(parseInt((JSON.parse(JSON.stringify(channels.rows)))[0].id));
					}
			});
		})
	},

	getRegionId: (region) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT id from regions WHERE name = '${region}';`
				db.query(queryString, null, (err, messages) => {
					if (err) {
			          	console.log('err retrieving Regionid from db', err);
			          	reject(err)
			        } else {
			        	console.log('successfully retrieving Regionid', JSON.parse(JSON.stringify(messages.rows)));
			        	resolve(parseInt((JSON.parse(JSON.stringify(messages.rows)))[0].id));
					}
			});
		})
	},

	findRegion: (lat, lng) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT id, name FROM regions WHERE ST_CONTAINS(regions.geom, ST_POINT(${lat}, ${lng}));`
				db.query(queryString, null, (err, regions) => {
					if (err) {
			          	console.log('err retrieving Region from db', err);
			          	reject(err)
			        } else {
			        	console.log('successfully retrieving Regionid', JSON.parse(JSON.stringify(regions.rows)));
			        	resolve(JSON.parse(JSON.stringify(regions.rows)));
					}
			});
		})
	},

	updateUserRegion: (userRegionID, userLat, userLong) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `UPDATE users SET regions=${userRegionID}, lat=${userLat}, lng=${userLong} `
				db.query(queryString, null, (err, result) => {
		        	if (err) {
		        		reject(err)
		        	} else {
		        		resolve(JSON.parse(JSON.stringify(result.rows)));
		        	}
				});
			}
		)
	},

	insertNewMessage: (queryArgs) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `INSERT INTO messages (username, content, regions, channels) VALUES ($1, $2, $3, $4)
								RETURNING id`
				db.query(queryString, queryArgs, (err, messages) => {
					if (err) {
			          	console.log('err inserting data in messages table', err);
			          	reject(err)
			        } else {
			        	console.log('Messages inserted successfully', messages.rows)
			        	resolve(messages.rows)
					}
			});
		})
	},

	insertNewUser: (oauthid, username) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `INSERT INTO users (oauthid, username) VALUES ('${oauthid}','${username}')
								RETURNING id`
				db.query(queryString, null, (err, user) => {
					if (err) {
			          	console.log('err inserting data in users table', err);
			          	reject(err);
			        } else {
			        	console.log('User inserted successfully', user.rows)
			        	resolve(parseInt((JSON.parse(JSON.stringify(user.rows)))[0].id));
					}
			});
		})
	},

  checkOrMakeUser: (oauthid, displayName) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT id FROM users WHERE oauthid = '${oauthid}'`
				db.query(queryString, null, (err, user) => {
					if (err) {
			          	console.log('err checking data in users table', err);
			          	reject(err);
			        } else {
			        	console.log('User found successfully', user.rows)
		                if (user.rows.length === 0) {
		                  console.log('could not be found')
		                  resolve(module.exports.insertNewUser(oauthid, displayName));
		                } else {
			        		resolve(parseInt((JSON.parse(JSON.stringify(user.rows)))[0].id ));
			        	}
					}
				});
			})
	},

	insertNewRegion: (userRegionName, userLat, userLong, radius) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `INSERT INTO regions VALUES (DEFAULT, '${userRegionName}', 
			    		${userLat}, ${userLong}, ${radius}, 
			    		ST_Buffer(ST_GeomFromText('POINT(${userLat} ${userLong})', 4326), ${radius}, 'quad_segs=8')) RETURNING id;`
				db.query(queryString, null, (err, region) => {
					if (err) {
						console.log('err inserting into regions table', err);
						reject(err)
					} else {
						console.log('New region inserted sucessfully', parseInt((JSON.parse(JSON.stringify(region.rows)))[0].id));
						resolve(parseInt((JSON.parse(JSON.stringify(region.rows)))[0].id));
					}
				})
			}
		)
	},

	getChannels: (region) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT channels.id AS id, channels.name AS name
									FROM channels 
									INNER JOIN regions  
									ON regions.id = channels.region
									WHERE regions.name = '${region}'`
				db.query(queryString, null, (err, data) => {
					if (err) {
						console.log('err getting channels for region', err);
						reject(err)
					} else {
						console.log('List of Channels', JSON.parse(JSON.stringify(data.rows)))
						resolve(JSON.parse(JSON.stringify(data.rows)))
					}
				})
			}
		)
	},

	insertStdChannels: (regionId) => {
		return new Promise(
			(resolve, reject) => {
				var queryString = `INSERT INTO channels VALUES 
									(DEFAULT, 'General', ${regionId}), 
									(DEFAULT, 'Marketplace', ${regionId}), 
									(DEFAULT, 'Events', ${regionId}) RETURNING id;`

				db.query(queryString, null, (err, data) => {
					if (err) {
						console.log('err inserting standard channels', err);
						reject(err)
					} else {
						console.log('List of Channels', JSON.parse(JSON.stringify(data.rows)))
						resolve(JSON.parse(JSON.stringify(data.rows)))
					}
				})
			}
		)
	},

	addChannel: (regionId, newChannel) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `INSERT INTO channels VALUES
								   (DEFAULT, '${newChannel}', ${regionId}) RETURNING id, name;`

				db.query(queryString, null, (err, data) => {
					if (err) {
						console.log('err inserting new channel', err);
						reject(err)
					} else {
						console.log('List of Channels', JSON.parse(JSON.stringify(data.rows))[0])
						resolve(JSON.parse(JSON.stringify(data.rows))[0])
					}
				})
			}
		)
	}
}
