var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var jsonFile = require('jsonfile');

var urlencodedParsesr = bodyParser.urlencoded({ parameterLimit: 10000000,extended:true, limit: '10mb'});

var query = require('../database/drugQuerys');

router.get('/drug_list_from_name', function(req, res) {
    query.selectDrugFromNameGet(req, res);
});
router.post('/drug_list_from_name', function(req, res) {
    query.selectDrugFromNamePost(req, res);
});

router.get('/drug_list_from_image', function(req, res) {
    query.selectDrugFromImageGet(req, res);
});

router.post('/drug_list_from_image', urlencodedParsesr, function(req, res) {
    imageLoad(req);

    

    query.selectDrugFromImagePost(req, res);
});

router.post('/drug_list_from_image_shape', function(req,res) {
    query.selectDrugFromImageShapePost(req, res);
});

router.get('/drug_list_from_shape', function(req,res) {
    query.selectDrugFromShapeGet(req, res);
});
router.post('/drug_list_from_shape', function(req,res) {
    query.selectDrugFromShapePost(req, res);
});

router.get('/test', function(req, res) {
    fs.readFile('.\\download\\json\\json.json', 'utf8', function(err, data){
        var jsonData = JSON.parse(data);
        console.log(jsonData);
        var base64str = base64_encode('.\\download\\srcImage\\dstImage.jpg');
        jsonData.image = base64str;

        console.log(jsonData);
        var json = JSON.stringify(jsonData);

        
        console.log(json);
    });
});

function base64_encode(file){
    var bitmap = fs.readFileSync(file);
    return new Buffer(bitmap).toString('base64');
}

function imageLoad(req) {
    var buf = Buffer.from(req.body.drugImage, 'base64');
    var dir = './uid/'+req.body.uid;
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.mkdirSync(dir+'/srcImage');
        fs.mkdirSync(dir+'/roiImage');
        fs.mkdirSync(dir+'/dstImage');
    }
    fs.writeFileSync( dir +'/srcImage/srcImage.jpg', buf, function(err) {
        if(err) throw err;
        console.log('file write completed');
    });
}

module.exports = router;