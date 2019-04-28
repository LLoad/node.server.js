var DBManager = require('./DBManager.js');
var connection = DBManager.getConnection();
require('date-utils');

exports.selectDrugFromName = function (req, res) {
    console.log(req.query.drugName);
    var query = 'SELECT * FROM drug WHERE drugName = "' + req.query.drugName + '"';
    connection.query(query, function (err, rows) {
            console.log(rows);
            res.json(rows);
    });
}

exports.selectDrugFromImage = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape = ?, drugColor = ?, drugRatio = ?';
    connection.query(query, [req.body.drugShape, req.body.drugColor, req.body.drugRatio], function(err, rows) {
        if(!err) {
            res.json( {
                result : 1,
                rows : rows
            });
        }
    });
}

exports.selectDrugFromText = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape = ?, drugColor = ?, drugFrontText = ?';
    connection.query(query, [req.body.drugShape, req.body.drugColor, req.body.drugFrontText], function(err, rows) {
        if(!err) {
            res.json( {
                result : 1,
                rows : rows
            });
        }
    });
}

exports.selectDrugFromId = function(req, res) {
    console.log(req.query.drugId);
    var query = 'SELECT * FROM drug WHERE drugId = "' + req.query.drugId+'"';
    connection.query(query, function(err, rows) {
        if(!err) {
            res.json( {
                result : 1,
                rows : rows
            });
        }
    });
}

exports.selectAll = function(req,res) {
    console.log("ok");
    var query = 'SELECT * FROM drug';
    connection.query(query, function(err, rows) {
        console.log(rows);
        res.json(rows);
    });
    console.log(query);
}