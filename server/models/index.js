const db = require('../../db');

module.exports = {
	getAllMessages: (area) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT users.username AS username, messages.content AS content, channels.name AS channel FROM messages 
					INNER JOIN areas ON messages.area = areas.id
					LEFT OUTER JOIN channels ON messages.channels = channels.id
					LEFT OUTER JOIN users ON messages.username = users.id
					WHERE areas.name = '${area}';`
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

	getChannelId: (channel) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT id from channels WHERE name = '${channel}';`
				db.query(queryString, null, (err, messages) => {
					if (err) {
			          	console.log('err retrieving channelid from db', err);
			          	reject(err)
			        } else {
			        	console.log('successfully retrieving channelid', JSON.parse(JSON.stringify(messages.rows)));
			        	resolve(parseInt((JSON.parse(JSON.stringify(messages.rows)))[0].id));
					}
			});
		})
	},

	getRegionId: (region) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `SELECT id from areas WHERE name = '${region}';`
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

	insertNewMessage: (queryArgs) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `INSERT INTO messages (username, content, channels, area) VALUES ($1, $2, $3, $4)
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

	insertNewUser: (username) => {
		return new Promise (
			(resolve, reject) => {
				var queryString = `INSERT INTO users (username) VALUES ('${username}')
								RETURNING id`
				db.query(queryString, null, (err, user) => {
					if (err) {
			          	console.log('err inserting data in users table', err);
			          	reject(err)
			        } else {
			        	console.log('User inserted successfully', user.rows)
			        	resolve(parseInt((JSON.parse(JSON.stringify(user.rows)))[0].id));
					}
			});
		})
	}
}