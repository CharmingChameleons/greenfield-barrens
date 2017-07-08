/***
Sample for how a database would be created via running query scripts.
Default Port: 5432
Example for Connecting NodeJS to PostgreSQL
http://nodeexamples.com/2012/09/21/connecting-to-a-postgresql-database-from-node-js-using-the-pg-module/
***/

const pg = require('pg');
const connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/todo';

/***
Here we create a new instance of Client to interact with the database and then establish communication with it via the connect() method. We then run a SQL query via the query() method. Finally, communication is closed via the end() method.
***/

// Creates a connection to the PG DB
const client = new pg.Client(connectionString);

client.connect();
const query = client.query(
  'CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');

// When all rows have been queried or an error occurs, then the query will end.
query.on('end', () => { client.end(); });
