// REQUIRED DEPENDANCIES
var express = require('express');
var router = express.Router();
var burgers = require('../models/burger.js');

router.get('/', function(req, res) {
	res.redirect('/burgers');
});

//ROUTE FOR THE 'BURGERS' WHICH CREATES AN OBJECT HOLDING THE BURGERS DATA AND RENDERS IT.
router.get('/burgers', function(req, res) {
	burgers.all(function(data) {
		var hbsObject = {
			burgers: data
		};
		//console.log(hbsObject);
		res.render('index', hbsObject);
	});
});

//POST ROUTE - BURGER NAME AND IF IT WAS DEVOURED OR NOT
router.post('/burgers/create', function(req, res) {
	console.log(req.body.name);
	console.log(req.body.devoured);
	burgers.create(['name', 'devoured'], [req.body.name, req.body.devoured], function() {
		res.redirect('/burgers');
	});
});

//PUT ROUTE 
router.put('/burgers/devour/:id', function(req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('burgers', condition);

	burgers.devour({
		devoured: req.body.devoured
	}, condition, function() {
		res.redirect('/burgers');
	});
});


//ROUTE FOR DELETE 
router.delete('/burgers/clear/:id', function (req, res) {
	var condition = 'id = ' + req.params.id;

	console.log('burgers', condition);

	burgers.clear(condition, function() {
		res.redirect('/burgers');
	});
});

module.exports = router;
