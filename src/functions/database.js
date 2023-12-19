/* eslint-disable max-len */
/* eslint-disable require-jsdoc */
require('dotenv').config();
const mysql = require('mysql2');
const tableName = process.env.TABLE_USER;

const connection = mysql.createConnection({
  host: process.env.PUBLIC_IP_SQL,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

function checkIfExists(usernameORemail) {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM ' + tableName + ' WHERE username = ? OR email = ?';
    connection.query(query, [usernameORemail, usernameORemail], (error, results) => {
      if (error) {
        reject(error);
      } else {
        const userExists = results.length > 0 ? results[0] : null;
        console.log(userExists);
        resolve(userExists);
      }
    });
  });
}

function insertUser(userData) {
  connection.query('INSERT INTO ' + tableName + ' SET ?', userData, (error, results) => {
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      console.log('Data inserted successfully:', results);
    }
  });
}

module.exports = {checkIfExists, insertUser};
