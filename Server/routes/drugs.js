var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');

var urlencodedParsesr = bodyParser.urlencoded({ parameterLimit: 10000000,extended:true, limit: '10mb'});

var query = require('../database/drugQuerys');

router.get('/drug_list_from_name', function(req, res) {
    query.selectDrugFromNameGet(req, res);
});
router.post('/drug_list_from_name', function(req, res) {
    query.selectDrugFromNamePost(req, res);
});

router.get('/drug_list_from_image', function(req, res) {
    console.log("asdasd");
    query.selectDrugFromImageGet(req, res);
});
router.post('/drug_list_from_image', urlencodedParsesr, function(req, res) {
    console.log(req.body.drugImage);
    var buf = Buffer.from(req.body.drugImage, 'base64');
    fs.writeFileSync('./download/cameraTemp.jpg', buf);
    res.json("hello POST");
    query.selectDrugFromImagePost(req, res);
});

router.get('/drug_list_from_shape', function(req,res) {
    query.selectDrugFromShapeGet(req, res);
});
router.post('/drug_list_from_shape', function(req,res) {
    query.selectDrugFromShapePost(req, res);
});
router.get('/drug_detail', function(req, res) {
    query.selectDrugFromId(req, res);
});
router.post('/drug_detail', function(req,res) {
    query.selectDrugFromText(req, res);
});

router.get('/drug', function(req, res) {
    query.selectAll(req, res);
});

module.exports = router;