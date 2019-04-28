var DBManager = require('./DBManager.js');
var connection = DBManager.getConnection();
require('date-utils');

exports.selectDrugFromName = function (req, res) {
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

exports.selectDrugFromImage = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape = ?, drugColor = ?, drugRatio = ?';
    connection.query(query, [req.body.drugShape, req.body.drugColor, req.body.drugRatio], function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        }
    });
}

exports.selectDrugFromShape = function(req, res) {
    var query;
    console.log(req.query.drugType);
    console.log(req.query.drugColor);
    console.log(req.query.drugShape);
    if(req.query.drugType != '') {
        query = 'SELECT * FROM drug WHERE drugType LIKE "%' + req.query.drugType +'%"';
        if(req.query.drugColor != '') {
            query += ', drugColor LIKE "%' + req.query.drugColor + '%"';
            if(req.query.drugShape != '') {
                query += ', drugType LIKE "%' + req.query.drugType + '%"';
            }
        } else {
            if(req.query.drugShape != '') {
                query += ', drugType LIKE "%' + req.query.drugType + '%"';
            }
        }
    } else {
        if(req.query.drugColor != '') {
            query = 'SELECT * FROM drug WHERE drugColor LIKE "%' + req.query.drugColor + '%"'
            if(req.query.drugShape != '') {
                query += ', drugShape LIKE "%' + req.query.drugShape + '%"';
            }
        } else {
            if(req.query.drugShape != '') {
                query = 'SELECT * FROM drug WHERE drugShape LIKE "%' + req.query.drugShape + '%"'
            } else {
                query = 'SELECT * FROM drug'
            }
        }
    
    }

    //var query = 'SELECT * FROM drug WHERE drugShape LIKE "%' + req.query.drugShape +'%"'
    //            + ', drugColor LIKE "%' + req.query.drugColor + '%"'
    //            + ', drugType LIKE "%' + req.query.drugType + '%"';
    //            + ', drugFrontText LIKE "%' + req.query.drugFrontText + '%"'
    //            + ', drugBackText LIKE "%' + req.query.drugBackText + '%"';
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