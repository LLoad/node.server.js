var DBManager = require('./DBManager.js');
var connection = DBManager.getConnection();
require('date-utils');
var bodyParser = require('body-parser');

exports.selectDrugFromNameGet = function (req, res) {
    console.log(req.query.drugName);

    var query = 'SELECT * FROM drug WHERE drugName LIKE "%' + req.query.drugName + '%"';
    connection.query(query, function (err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        } else {  
            res.json({result : -1}); 
        }
    });
}

exports.selectDrugFromNamePost = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugName LIKE "%' + req.body.drugName + '%"';
    connection.query(query, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        }
    });
}

exports.selectDrugFromImageGet = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape = ?, drugColor = ?, drugRatio = ?';
    connection.query(query, [req.body.drugShape, req.body.drugColor, req.body.drugRatio], function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        }
    });
}

exports.selectDrugFromImagePost = function(req, res) {


}

exports.selectDrugFromShapeGet = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape LIKE "%' + req.query.drugShape +'%"'
                + 'AND drugColor LIKE "%' + req.query.drugColor + '%"'
                + 'AND drugType LIKE "%' + req.query.drugType + '%"'
                + 'AND drugFrontText LIKE "%' + req.query.drugFrontText + '%"'
                + 'AND drugBackText LIKE "%' + req.query.drugBackText + '%"';
    connection.query(query, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
            console.log(query);
        } else {
            res.json({result : -1});
        }
    });
}

exports.selectDrugFromShapePost = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape LIKE "%' + req.body.drugShape +'%"'
                + 'AND drugColor LIKE "%' + req.body.drugColor + '%"'
                + 'AND drugType LIKE "%' + req.body.drugType + '%"'
                + 'AND drugFrontText LIKE "%' + req.body.drugFrontText + '%"'
                + 'AND drugBackText LIKE "%' + req.body.drugBackText + '%"';
    connection.query(query, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        }
    });
}

exports.selectDrugFromId = function(req, res) {
    console.log(req.query.drugId);
    var query = 'SELECT * FROM drug WHERE drugId = "' + req.query.drugId+'"';
    connection.query(query, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
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