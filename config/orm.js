//O.R.M. FUNCTIONS THAT TAKE IN INPUTS AND TURNS THEM INTO SQL DATBASE COMMANDS.

var connection = require('../server.js');

//OBJECT RELATIONAL MAPPING
function printQuestionMarks(num) {
    var arr = [];

    for (var i = 0; i < num; i++) {
        arr.push('?');
    }

    return arr.toString();
}

function objToSql(ob) {
    var arr = [];

    for (var key in ob) {
        if (ob.hasOwnProperty(key)) {
            arr.push(key + '=' +  ob[key]);
        }
    }

    return arr.toString();
}

var orm = {
    all: function(tableInput, cb) {
        var queryString = 'SELECT * FROM ' + tableInput + ';';
        connection.query(queryString, function(err, result) {
                if (err) throw err;
                cb(result);
        });
    },


    // VALS IS AN ARRAY OF VALUES THAT WE WANT TO SAVE TO COLS
    // COLS ARE THE COUMNS WE WANT TO INSERT THE VALUES INTO
    create: function(table, cols, vals, cb) {
        console.log(vals);
        var queryString = 'INSERT INTO ' + table;

        queryString = queryString + ' (';
        queryString = queryString + cols.toString();
        queryString = queryString + ') ';
        queryString = queryString + 'VALUES (';
        queryString = queryString + printQuestionMarks(vals.length);
        queryString = queryString + ') ';

        console.log('\nQuery:', queryString);

        connection.query(queryString, vals, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    },

    //objColVals WOULD BE THE COLUMNS AND VALUES BEING UPDATED
    //EX: {NAME: RAMIRO, TIRED: TRUE}

    devour: function(table, objColVals, condition, cb) {
        var queryString = 'UPDATE ' + table;

        queryString = queryString + ' SET ';
        queryString = queryString + objToSql(objColVals);
        queryString = queryString + ' WHERE ';
        queryString = queryString + condition;

        console.log('\nQuery:', queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });

    },

    clear: function(table, condition, cb) {
        var queryString = 'DELETE FROM ' + table;

        queryString = queryString + ' WHERE ';
        queryString = queryString + condition;

        console.log('\nQuery:', queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        });
    }   
};

module.exports = orm;
