const mysql = require ('mysql2');
const util = require('util');




const connection = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // TODO: Add MySQL password here
      password: 'G3t_C0D!ng',
      database: 'employees_db'
    }
  );

connection.connect()
connection.query = util.promisify(connection.query);
module.exports = connection;


