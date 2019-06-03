var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
var fs = require('fs');
var util = require('util');
var exec = require('child_process').exec;
var jsonFile = require('jsonfile');
var formidable = require('formidable');
var multer = require("multer");

var urlencodedParsesr = bodyParser.urlencoded({ parameterLimit: 10000000000,extended:true, limit: '10mb'});

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

router.post('/drug_list_from_image', function(req, res) {
    var buf = Buffer.from(req.body.drugImage, 'base64');
    var dir = './uid/';
    if(!fs.existsSync(dir)) {
        fs.mkdirSync(dir);
        fs.mkdirSync(dir+'/srcImage');
        fs.mkdirSync(dir+'/dstImage');
    }
    fs.writeFile(dir +'srcImage/srcImage.jpg', buf, (err) => {
        console.log('file write completed');
    });
    
    console.log(req.body.uid);
        
    setTimeout(function() {
        var cmd = ".\\DMI.exe"
        console.log(cmd);
        var jsonData;
        exec(cmd, (error, stdout, stderr) => {
            var jsonData = JSON.parse(stdout);

            var Array = jsonData.drugs;
            var itemShape;
            var frontColor;
            var backColor;
            
            console.log(jsonData.drugCount);
            
            for(var i = 0; i < jsonData.drugCount; i++) {
                itemShape = Array[i]["ITEMSHAPE"].toString();
                itemShape = switchShape(itemShape);
                Array[i]["ITEMSHAPE"] = itemShape;
                frontColor = Array[i]["FRONTCOLOR"].toString();
                frontColor = switchColor(frontColor);
                Array[i]["FRONTCOLOR"] = frontColor;
                backColor = Array[i]["BACKCOLOR"].toString();
                backColor = switchColor(backColor);
                Array[i]["BACKCOLOR"] = backColor;
            }
            jsonData.drugs = Array;
    
            var base64str = base64_encode(dir +'dstImage\\cameraTemp.jpg');
            jsonData.image = base64str;
            console.log(jsonData);
            var json = JSON.stringify(jsonData);
            res.json(json);
         
        });
    }, 1000);
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

        var Array = jsonData.drugs;
        var itemShape;
        var frontColor;
        var backColor;
        
        for(var i = 0; i < jsonData.drugCount; i++) {
            itemShape = Array[i]["ITEMSHAPE"].toString();
            itemShape = switchShape(itemShape);
            Array[i]["ITEMSHAPE"] = itemShape;
            frontColor = Array[i]["FRONTCOLOR"].toString();
            frontColor = switchColor(frontColor);
            Array[i]["FRONTCOLOR"] = frontColor;
            backColor = Array[i]["BACKCOLOR"].toString();
            backColor = switchColor(backColor);
            Array[i]["BACKCOLOR"] = backColor;
        }
        jsonData.drugs = Array;

        //var base64str = base64_encode('.\\download\\srcImage\\dstImage.jpg');
        //jsonData.image = base64str;
        
        var json = JSON.stringify(jsonData);

        console.log(json);
    });
});

router.get('/test2', function(req, res) {
    var cmd = ".\\main.exe " + 5 + " .\\";     // python.exe 파일 실행
    var jsonData;
    console.log(cmd);
    exec(cmd, (error, stdout, stderr) => {
        if(error) console.error('error : ' +error);
        


    });
});

router.get('/test3', function(req, res) {
        var query = 'SELECT * FROM drug WHERE ITEMSHAPE LIKE "%' + "정" +'%"'
                + 'AND ((FRONTMARK LIKE "%' + "T" + '%"'
                        + 'AND BACKMARK LIKE "%' + "" + '%")'
                    + 'OR (FRONTMARK LIKE "%' + "" + '%"'
                        + 'AND BACKMARK LIKE "%' + "T" + '%"))'
                + 'AND (LSRATIO BETWEEN ' + 0.9 + ' AND ' + 1.1 + ')'
                + 'AND ((FRONTCOLOR LIKE "%' + "하양" + '%"'
                    + 'AND BACKCOLOR LIKE "%' + "" + '%")'
                    + 'OR (FRONTCOLOR LIKE "%' + "" + '%"'
                    + 'AND BACKCOLOR LIKE "%' + "하양" + '%"))';
                    console.log(query);
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
        fs.mkdirSync(dir+'/json');
    }
    fs.writeFileSync( dir +'/srcImage/srcImage.jpg', buf, function(err) {
        if(err) console.log(err);
        console.log('file write completed');
    });
}

function switchShape(shape) {
    shape = parseInt(shape);
    switch(shape) {
        case 1: {
            shape = "원형"; break; }
        case 2: {
            shape = "타원형"; break; }
        case 3: {
            shape = "장방형"; break; }
        case 4: {
            shape = "반원형"; break; }
        case 5: {
            shape = "마름모형"; break; }
        case 6: {
            shape = "삼각형"; break; }
        case 7: {
            shape = "사각형"; break; }
        case 8: {
            shape = "오각형"; break; }
        case 9: {
            shape = "육각형"; break; }
        case 10: {
            shape = "팔각형"; break; }
        case 11: {
            shape = "기타"; break; }    
    }
    return shape;
}

function switchColor(color) {
    color = parseInt(color);
    switch(color) {
        case 1: {
            color = "하양"; break; }
        case 2: {
            color = "노랑"; break; }
        case 3: {
            color = "주황"; break; }
        case 4: {
            color = "분홍"; break; }
        case 5: {
            color = "빨강"; break; }
        case 6: {
            color = "갈색"; break; }
        case 7: {
            color = "연두"; break; }
        case 8: {
            color = "초록"; break; }
        case 9: {
            color = "청록"; break; }
        case 10: {
            color = "파랑"; break; }
        case 11: {
            color = "남색"; break; }
        case 12: {
            color = "자주"; break; }
        case 13: {
            color = "보라"; break; }
        case 14: {
            color = "회색"; break; }
        case 15: {
            color = "검정"; break; }
        case 16: {
            color = "투명"; break; }
        default: {
            color = ""; break; }
    }
    return color;
}

module.exports = router;