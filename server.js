var mysql = require('mysql');
var express = require('express');

var connection;

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('config/orm'));
}
 else {
 	connection = mysql.createConnection({
		host: "localhost",
		port: 3001,
		user: "root",
		password: "rootroot",
		database: "burger_db"
	});
};

connection.connect(function(err) {
    if (err) {
    	console.error('error connecting: ' + err.stack);
    	return;
    } 
    console.log("server runnig on " + connection.threadId);
});

module.exports= connection;