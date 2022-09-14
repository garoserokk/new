const mysql = require("mysql2/promise");

const pool = mysql.createPool({
	// aws ip
	host: "43.200.206.77",
	// mysql username
	user: "hun",
	// mysql user password
	password: "woadjqtdj1!",
	// db name
	database: "order_system",
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
});

module.exports = { pool };
