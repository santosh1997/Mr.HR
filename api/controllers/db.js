var mysql = require('mysql');

const con = mysql.createConnection({
	host : "localhost",
	user : "root",
	password : "123456",
	database : "san",
	multipleStatements: true
});

module.exports = con;