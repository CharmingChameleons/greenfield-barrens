const { dummyChannels, dummyUsers, dummyMessages } = require('../dummyData');

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

		post: () => {

		}
	}, 

	users: {
		get: () => {

		},

		post: () => {

		}
	},


}

// app.get('/', (req, res) => {
//   res.send('server is responding to different paths');
// });

// app.get('/api/messages/:lat/:long', (req, res) => {

// });

// app.get('/api/:lat/:long/:channel', (req, res) => {
//   //
// });

// app.get('/api/region/:lat/:long', (req, res) => {
//   //retrieve region name based off lat and long
// });

// app.put('/api/users/:username/:lat/:long', (req, res) => {
//   //update the user with name=username with the coords denoting their location
//   //update is likely not the same command as insert into
//   //if update is complicated, have it all come in as a single request
//   //return a response that contains the type string region name
//   const userLat = req.params.lat;
//   const userLong = req.params.long;

//   const userCoord = `ST_SetSRID(ST_MakePoint(${userLat}, ${userLong}),4326)`;
//   //db.query(`SELECT id, name FROM areas WHERE ST_Contains(geom, ${userCoord});`, null, (err, result) => {
//   db.query(`SELECT id, name FROM areas WHERE minlong=-122.4127313;`, null, (err, result) => {  
//     if (err) {
//       console.log('err executing ST_Contains:', err);
//       res.sendStatus(500);
//     } else {
//       const userRegionID = result.rows[0].id;
//       const userRegionName = result.rows[0].name;
//       console.log('id and name of region user was placed in:', result.rows[0].name);
//       //at this point we have the id and name
//       //update the users table with the id of the region that user is in
//       //send the name of the region the user was placed in
//       db.query(`UPDATE users SET area=${userRegionID}`, null, (err, result) => {
//         if (err) {
//           console.log('err updating the user record', err);
//           res.sendStatus(500);
//         } else {
//           console.log('successfully updated user');
//           res.status(201).send(`${userRegionName}`);
//         }
//       });
//     }
//   });

//   //res.status(201).send('Hack reactor');
// });
// // likely no posting messages route -- everything will happen in the socket