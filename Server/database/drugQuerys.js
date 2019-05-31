var DBManager = require('./DBManager.js');
var connection = DBManager.getConnection();
require('date-utils');
var bodyParser = require('body-parser');
var exec = require('child_process').execSync;
var fs = require('fs');
var jsonFile = require('jsonfile');

exports.selectDrugFromNameGet = function (req, res) {
    console.log(req.query.drugName);

    var query = 'SELECT * FROM drug WHERE ITEMNAME LIKE "%' + req.query.drugName + '%"';
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
    var query = 'SELECT * FROM drug WHERE ITEMNAME LIKE "%' + req.body.drugName + '%"';
    console.log(req.body.drugName);
    connection.query(query, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        }
    });
}

exports.selectDrugFromImageGet = function(req, res) {
    console.log('get');
    var cmd = ".\\database\\jsonTest.exe"
    var jsonData;
    exec(cmd, (error, stdout, stderr) => {
        if(error) console.error('error : ' +error);
        fs.writeFile('.\\download\\json\\test.json', stdout, (err) => {
            if(err) console.log(err);
            else console.log(stdout);
        });

        fs.readFile('.\\download\\json\\json.json', 'utf8', function(err, data){
            jsonData = JSON.parse(data);
            console.log(jsonData.drugCount);
            console.log(jsonData.image);
            console.log(jsonData.drugs);
            
        });
        var json = JSON.stringify(jsonData);
        console.log(json);
        //console.log(stdout);
    });
}

exports.selectDrugFromImagePost = function(req, res) {
    console.log('post');
}

exports.selectDrugFromImageShapePost = function(req, res) {
    console.log(req.body.drugRatio);
    var minRatio = req.body.drugRatio - 0.1;
    console.log(minRatio);
    var maxRatio = req.body.drugRatio + 0.1;
    console.log(maxRatio);
    var query = 'SELECT * FROM drug WHERE ITEMSHAPE LIKE "%' + req.body.drugShape +'%"'
                + 'AND ((FRONTMARK LIKE "%' + req.body.drugFrontText + '%"'
                        + 'AND BACKMARK LIKE "%' + req.body.drugBackText + '%")'
                    + 'OR (FRONTMARK LIKE "%' + req.body.drugBackText + '%"'
                        + 'AND BACKMARK LIKE "%' + req.body.drugFrontText + '%"))'
                + 'AND (LSRATIO BETWEEN ' + minRatio + ' AND ' + maxRatio + ')'
                + 'AND ((FRONTCOLOR LIKE "%' + req.body.drugFrontColor + '%"'
                    + 'AND BACKCOLOR LIKE "%' + req.body.drugBackColor + '%")'
                    + 'OR (FRONTCOLOR LIKE "%' + req.body.drugBackColor + '%"'
                    + 'AND BACKCOLOR LIKE "%' + req.body.drugFrontColor + '%"))';

    connection.query(query, function(err, rows) {
        if(!err) {
            console.log(rows);
            res.json(rows);
        }
    });
}

exports.selectDrugFromShapeGet = function(req, res) {
    var query = 'SELECT * FROM drug WHERE drugShape LIKE "%' + req.query.drugShape +'%"'
                + 'AND drugColor LIKE "%' + req.query.drugColor + '%"'
                + 'AND REFINING LIKE "%' + req.query.drugType + '%"'
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
    console.log(req.body.drugShape);
    console.log(req.body.drugColor);
    console.log(req.body.drugType);
    console.log(req.body.drugFrontText);
    console.log(req.body.drugBackText);
    var query = 'SELECT * FROM drug WHERE ITEMSHAPE LIKE "%' + req.body.drugShape +'%"'
                + 'AND REFINING LIKE "%' + req.body.drugType + '%"'
                + 'AND ((FRONTMARK LIKE "%' + req.body.drugFrontText + '%"'
                        + 'AND BACKMARK LIKE "%' + req.body.drugBackText + '%")'
                    + 'OR (FRONTMARK LIKE "%' + req.body.drugBackText + '%"'
                        + 'AND BACKMARK LIKE "%' + req.body.drugFrontText + '%"))'
                + 'AND (FRONTCOLOR LIKE "%' + req.body.drugColor + '%"'
                    + 'OR BACKCOLOR LIKE "%' + req.body.drugColor + '%")';
    console.log(query);
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

function base64_encode(file){
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}