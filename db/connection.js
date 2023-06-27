//Here, we include the 'mysql2' module as a dependency in our app. We 'require' it so that we can provide an interface to interact with our "schema.sql" file, which stores our "tables" and their content (after "seeding" occurs).
const mysql = require('mysql2');

//Here, we 'require' the 'util' module (built-in to NodeJS), so that we can 'util'ize its methods for a vareity of things, including working with objecs and dealing with 'async'hronous functions.
const util = require('util');

//Here, we use the 'createConnection' method provided by the 'mysql2' module to create a 'connection' "object", used to connect to our "schema.sql" file.
const connection = mysql.createConnection(
    {
        //Here, we specify the credentials that 'createConnection' should use in order to connect to our "schema.sql". Using this "object", we can make queries and handle query results.
        host: 'localhost',
        user: 'root',
        password: 'G3t_C0D!ng',
        database: 'employees_db'
    }
);

//Here, we call the 'connect' method on the 'connection' "object" to initiate the connection with our app's "mysql database".
connection.connect();

//'promisify' modifies our 'query' methods and tries to convert them into "promises", so that we can utilize "async await functions" in our other documents.
connection.query = util.promisify(connection.query);

// This line 'exports' and makes the 'connection' "object" available for other files to import when they require this module.
module.exports = connection;


