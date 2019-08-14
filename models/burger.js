var orm = require('../config/orm.js');

var burgers = {
	all: function (cb) {
		orm.all('Burgers', function (res) {
			cb(res);
		});
    },
    	
	create: function(cols, vals, cb) {
		orm.create('Burgers', cols, vals, function (res){
			cb(res);
		});
	},
	devour: function (objColVals, condition, cb) {
		orm.devour('Burgers', objColVals, condition, function (res) {
			cb(res);
		})
	},
	clear: function (condition, cb) {
		orm.clear('Burgers', condition, function (res) {
			cb(res);
		});
	}
};

module.exports = burgers;