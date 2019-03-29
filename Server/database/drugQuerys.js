var DBManager = require('./DBManager.js');
var connection = DBManager.getConnection();

exports.selectDrugFromName = function (req, res) {
    var query = 'SELECT * FROM drug WHERE drugName = ?';
    connection.query(query, [req.body.drugName], function (err, rows) {
        if(!err) {
            res.json( {
                result : 1,
                rows : rows
            });
        }
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
    console.log("ok1");
    var query = 'SELECT FROM drug WHERE drugId = ?';
    connection.query(query, [req.body.drugId], function(err, rows) {
        if(!err) {
            console.log("ok2");
            res.json( {
                result : 1,
                rows : rows
            });
        }
    });
}